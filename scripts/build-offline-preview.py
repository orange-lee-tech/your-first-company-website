import base64, gzip, json, mimetypes, re
from pathlib import Path
from urllib.parse import unquote, urlsplit, urljoin
from lxml import html


WRAPPER_CSS = 'html,body{margin:0;height:100%;overflow:hidden}body{background:#172526;color:white;font:16px system-ui}iframe{display:block;border:0;width:100%;height:100%;background:white}#status{position:absolute;left:1rem;top:1rem}#status:empty{display:none}'
RUNTIME = r"""
const status=document.querySelector('#status'), frame=document.querySelector('iframe');
const bytes=Uint8Array.from(atob(document.querySelector('#archive').textContent), c=>c.charCodeAt(0));
async function start(){
 const data=JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
 let jump='';
 const go=()=>{
  const [location,anchor]=decodeURI(locationHash()).split('|');
  const route=Object.hasOwn(data.pages, location)?location:'/';
  jump=anchor||'';
  const doc=data.pages[route].replace(/<style data-offline-style="([^"]+)"><\/style>/g,(_,key)=>'<style>'+data.styles[key]+'</style>');
  frame.srcdoc=doc.replace(/data:application\/x-preview-asset,asset-(\d+)/g,(_,i)=>data.assets[Number(i)]);
  frame.dataset.route=route;
 };
 function locationHash(){return window.location.hash.slice(1)||'/';}
 frame.addEventListener('load',()=>{
  const doc=frame.contentDocument;
  if(!doc?.documentElement)return;
  status.textContent='';
  const jumpTo=id=>{
   const element=doc.getElementById(id);
   if(!element)return;
   if(element.tagName==='DETAILS')element.open=true;
   for(let details=element.closest('details');details;details=details.parentElement?.closest('details'))details.open=true;
   element.scrollIntoView();
  };
  if(jump)requestAnimationFrame(()=>jumpTo(jump));
  doc.addEventListener('click',e=>{
   const target=e.target.closest('a[data-offline-route]');
   if(target){
    e.preventDefault();
    const next=target.dataset.offlineRoute, anchor=target.dataset.offlineAnchor;
    if(next===frame.dataset.route && anchor){jumpTo(anchor);return;}
    window.location.hash=encodeURI(next+(anchor?'|'+anchor:''));
    return;
   }

  });
 });
 window.addEventListener('hashchange',go);
 go();
}
start().catch(()=>status.textContent='此浏览器无法读取预览，请用近期版本的 Edge 或 Chrome 打开。');
"""

def pack(title,root,dest):
 keys=['/','/departments/','/activities/','/resources/','/about/','/join/']+['/departments/'+p.name+'/' for p in sorted((root/'departments').iterdir()) if p.is_dir() and (p/'index.html').is_file()]
 pages, styles={},{}
 assets, asset_ids=[],{}
 def asset(v,base):
  u=urlsplit(urljoin('https://offline.example'+base,v))
  p=root/unquote(u.path).lstrip('/')
  if u.netloc!='offline.example'or not p.is_file():return None
  if p not in asset_ids:
   asset_ids[p]=len(assets)
   assets.append('data:'+ (mimetypes.guess_type(p)[0] or 'application/octet-stream') +';base64,'+base64.b64encode(p.read_bytes()).decode())
  return 'data:application/x-preview-asset,asset-'+str(asset_ids[p])
 def inline_css(s,base):
  def sub(m):
   v=next(t for t in m.groups() if t is not None).strip()
   if v.startswith(('data:','#')):return m[0]
   return 'url("'+(asset(v,base)or'')+'")'
  s=re.sub(r'@import\s+(?:url\([^)]*\)|"[^"]*"|\'[^\']*\')[^;]*;', '',s,flags=re.I)
  return re.sub(r'url\(\s*(?:"([^"]*)"|\'([^\']*)\'|([^)]*?))\s*\)',sub,s,flags=re.I)
 for key in keys:
  p=root/(key.lstrip('/')+'index.html' if key.endswith('/') else key.lstrip('/'))
  doc=html.document_fromstring(p.read_text())
  for el in doc.xpath('//script|//noscript|//iframe|//base|//meta[@http-equiv]|//meta[@property]|//next-route-announcer'):
   el.drop_tree()
  for link in doc.xpath('//link'):
   href=link.get('href','')
   if link.get('rel')=='stylesheet' and href:
    csspath=urlsplit(urljoin('https://offline.example'+key,href)).path
    source=root/unquote(csspath).lstrip('/')
    if source.is_file():
     styles.setdefault(csspath,inline_css(source.read_text(),csspath));link.tag='style';link.attrib.clear();link.set('data-offline-style',csspath);continue
   link.drop_tree()
  for el in doc.xpath('//style[not(@data-offline-style)]'):el.text=inline_css(el.text or '',key)
  for el in doc.xpath('//*[@style]'):el.set('style',inline_css(el.get('style'),key))
  for el in doc.xpath('//*[@src or @srcset or @loading]'):
   for a in ['srcset','loading']:el.attrib.pop(a,None)
   if el.get('src'):
    v=asset(el.get('src'),key)
    if v:el.set('src',v)
    else:el.attrib.pop('src',None)
  for a in doc.xpath('//a[@href]'):
   original=a.get('href');u=urlsplit(urljoin('https://offline.example'+key,original))
   k=u.path
   if k not in keys and k+'/' in keys:k+='/'
   if u.netloc=='offline.example' and k in keys:
    a.set('data-offline-route',k);a.set('data-offline-anchor',u.fragment);a.set('href','#')
   elif u.netloc=='offline.example':a.attrib.pop('href',None)
   else:a.set('target','_blank');a.set('rel','noopener noreferrer')
  doc.find('head').append(html.fragment_fromstring('<style>[hidden]{display:none!important} #offline-photo::backdrop{background:#000b}</style>'))
  pages[key]='<!doctype html>'+html.tostring(doc,encoding='unicode',method='html')
 data=base64.b64encode(gzip.compress(json.dumps({'pages':pages,'styles':styles,'assets':assets},ensure_ascii=False).encode(), mtime=0)).decode()
 dest.parent.mkdir(parents=True,exist_ok=True)
 dest.write_text(f'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><style>{WRAPPER_CSS}</style><div id="status" role="status">正在打开预览…</div><iframe title="{title}" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe><script id="archive" type="application/octet-stream">{data}</script><script>{RUNTIME}</script></html>')
 print(dest,len(pages),dest.stat().st_size)

if __name__ == "__main__":
 import argparse
 parser = argparse.ArgumentParser(description="生成可离线双击打开的单文件 HTML")
 parser.add_argument("--root", type=Path, default=Path("out"))
 parser.add_argument("--output", type=Path, default=Path("preview/company-website-preview.html"))
 args = parser.parse_args()
 pack("中南大学人工智能协会 · 离线预览", args.root, args.output)
