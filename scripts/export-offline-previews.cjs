const { chromium } = require('playwright');
const { createServer } = require('node:http');
const { readFileSync, writeFileSync, statSync, readdirSync } = require('node:fs');
const path = require('node:path');
const { gzipSync } = require('node:zlib');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2'};
function file(root, p) {
  const name = path.resolve(root, '.' + decodeURIComponent(p));
  return [name,path.join(name,'index.html'), name+'.html'].find(a=>{try{return statSync(a).isFile()}catch{return false}});
}
function server(root){return createServer((req,res)=>{
 const f=file(root,new URL(req.url,'http://localhost').pathname);
 if(!f)return res.writeHead(404).end();
 res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'text/plain; charset=utf-8'}).end(readFileSync(f));
});}
function makeOffline(root, raw, origin, route, styles) {
 const toData=(value, base)=>{
   try {
    const url=new URL(value,base);
    if(url.origin!==origin)return null;
    const f=file(root,url.pathname);
    if(!f)return null;
    return 'data:'+(mime[path.extname(f)]||'application/octet-stream')+';base64,'+readFileSync(f).toString('base64');
   }catch{return null;}
 };
 const css=(s,base)=>s.replace(/\/\*[\s\S]*?\*\//g,'').replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi,(match,a,b,c)=>{
  const ref=a??b??c;
  if(ref.startsWith('data:')||ref.startsWith('#'))return match;
  const replacement=toData(ref,base);return replacement?'url("'+replacement+'")':'url("")';
 }).replace(/@import\s+(?:url\([^)]*\)|"[^"]*"|'[^']*')[^;]*;/gi,'');
 raw=raw.replace(/<link\b[^>]*>/gi,tag=>{
   const rel=tag.match(/\brel="([^"]+)"/i)?.[1],href=tag.match(/\bhref="([^"]+)"/i)?.[1];
   if(rel!=='stylesheet'||!href)return '';
   const url=new URL(href,origin+route),f=url.origin===origin?file(root,url.pathname):null;
   if(!f)return '';
   if(!(url.pathname in styles))styles[url.pathname]=css(readFileSync(f,'utf8'),url.href);
   return '<style data-offline-style="'+url.pathname+'"></style>';
 });
 raw=raw.replace(/<style(?![^>]*data-offline-style)[^>]*>([\s\S]*?)<\/style>/gi,(_,body)=>'<style>'+css(body,origin+route)+'</style>');
 raw=raw.replace(/<[^>]+>/g,tag=>tag.replace(/(\b(?:src|poster))="([^"]*)"/gi,(_,key,v)=>{
   if(v.startsWith('data:')) return key+'="'+v+'"';
   const d=toData(v.replaceAll('&amp;','&'),origin+route);
   return d?key+'="'+d+'"':'';
 }).replace(/\bstyle="([^"]+)"/gi,(_,v)=>'style="'+css(v.replaceAll('&quot;','"'),origin+route).replaceAll('"','&quot;')+'"'));
 return raw;
}
const wrapperCss = 'html,body{margin:0;height:100%;overflow:hidden}body{background:#172526;color:white;font:16px system-ui}iframe{display:block;border:0;width:100%;height:100%;background:white}#status{position:absolute;left:1rem;top:1rem}#status:empty{display:none}';
const runtime = String.raw`
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
  frame.srcdoc=doc;
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
   const filter=e.target.closest('[data-category]');
   if(filter && filter.closest('#projects-filters')){
    const buttons=doc.querySelectorAll('#projects-filters button');
    buttons.forEach(b=>b.classList.toggle('is-active',b===filter));
    doc.querySelectorAll('[data-preview-category]').forEach(card=>card.hidden=filter.dataset.category!=='all'&&card.dataset.previewCategory!==filter.dataset.category);
   }
   if(e.target.closest('#preview') && doc.getElementById('topic')){
    doc.getElementById('result').textContent='演示完成。已选方向：'+doc.getElementById('topic').value+'。';
   }
   const media=e.target.closest('[data-media-src]');
   if(media){
    const img=media.querySelector('img');
    if(!img)return;
    let dialog=doc.querySelector('#offline-photo');
    if(!dialog){
     dialog=doc.createElement('dialog');dialog.id='offline-photo';
     dialog.innerHTML='<form method="dialog"><button aria-label="关闭图片">关闭</button></form><img style="max-width:80vw;max-height:76vh;display:block">';
     doc.body.append(dialog);
    }
    const photo=dialog.querySelector('img');photo.src=img.src;photo.alt=img.alt;
    dialog.querySelector('button').onclick=()=>dialog.close();
    dialog.showModal();
   }
   if(e.target.closest('[data-preview-menu]')) {
    const menu=doc.querySelector('#offline-mobile-menu');
    if(menu)menu.hidden=!menu.hidden;
   }
  });
 });
 window.addEventListener('hashchange',go);
 go();
}
start().catch(()=>status.textContent='此浏览器无法读取预览，请用近期版本的 Edge 或 Chrome 打开。');
`;
async function pack(browser, kind, output, title) {
 const root=path.resolve('offline-input',kind);
 const http=server(root);await new Promise(r=>http.listen(0,'127.0.0.1',r));
 const origin='http://127.0.0.1:'+http.address().port;
 const homepage=kind==='home';
 let routes=homepage?['/','/projects.html','/learning.html','/capabilities.html','/updates.html','/post.html?lang=zh&f=2026-10-12-field-note.md']:[
 '/','/about/','/services/','/cases/','/teachers/','/faq/','/contact/','/demo-form.html',
 ...['services','cases','teachers'].flatMap(section=>readdirSync(path.join(root,section),{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>'/'+section+'/'+x.name+'/'))
 ];
 const keys=routes.map(r=>r.split('?')[0]);
 const context=await browser.newContext({viewport:{width:1440,height:960}});
 await context.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
 const page=await context.newPage();
 page.on('pageerror',e=>console.log('Render error:',e.message));
 page.on('console',msg=>{if(msg.type()==='error')console.log(msg.text().slice(0,350));});
 const pages={},styles={};
 const ready={'/':'#archive-portals .portal-card','/projects.html':'#projects-filters button','/learning.html':'#knowledge-grid > *','/capabilities.html':'#capability-list article','/updates.html':'.update-post-card','/post.html':'#post-body p'};
 for(const route of routes){
  const key=route.split('?')[0];
  console.log(kind,route);
  await page.goto(origin+route,{waitUntil:'networkidle'});
  if(homepage) {
   try { await page.locator(ready[key]).first().waitFor({state:'attached',timeout:4000}); }
   catch (error) {
    console.log('Page state',route,await page.locator('.subpage-status,.archive-state').allTextContents());
    if(key === '/') throw error;
   }
  }
  const raw=await page.evaluate(({keys,homepage,key})=>{
   const root=document.documentElement.cloneNode(true);
   root.querySelectorAll('script, noscript, iframe, next-route-announcer, [srcset]').forEach(e=>e.hasAttribute('srcset')?e.removeAttribute('srcset'):e.remove());
   root.querySelectorAll('[loading]').forEach(e=>e.removeAttribute('loading'));
   root.querySelectorAll('meta[http-equiv], meta[property], meta[name^="twitter"], base').forEach(e=>e.remove());
   if(homepage){
    const categories=['engineering','software'];
    root.querySelectorAll('#projects-grid article').forEach((card,i)=>card.dataset.previewCategory=categories[i]||'');
   }
   function canonical(url){
    let value=url.pathname;
    if(value==='/index.html')value='/';
    const aliases={'/archive.html':'/','/gallery.html':'/updates.html','/posts.html':'/updates.html','/research.html':'/learning.html','/knowledge.html':'/learning.html'};
    if(homepage&&aliases[value])value=aliases[value];
    return keys.includes(value)?value:keys.includes(value+'/')?value+'/':null;
   }
   for(const a of root.querySelectorAll('a[href]')){
    const href=a.getAttribute('href');
    if(href.startsWith('#')) {
     a.dataset.offlineRoute=key;
     a.dataset.offlineAnchor=href.slice(1);
     continue;
    }
    const url=new URL(href,location.href);
    const dest=url.origin===location.origin?canonical(url):null;
    if(dest){
     a.dataset.offlineRoute=dest;
     a.dataset.offlineAnchor=url.hash.slice(1);
     a.setAttribute('href','#');
    }else if(/^https?:|^mailto:/.test(url.protocol) && url.origin!==location.origin){
     a.setAttribute('target','_blank');
     a.setAttribute('rel','noopener noreferrer');
    }else{
     a.removeAttribute('href');
    }
   }
   if(homepage)root.querySelectorAll('.archive-language,[data-unified-language]').forEach(e=>e.remove());
   if(!homepage && key!='/demo-form.html'){
    const menuButton=root.querySelector('header button[aria-label*="全站导航"]');
    if(menuButton && /menu|菜单|导航/i.test(menuButton.getAttribute('aria-label'))){
     menuButton.dataset.previewMenu='true';
     const nav=document.createElement('nav');
     nav.id='offline-mobile-menu';nav.hidden=true;
     nav.style.cssText='position:absolute;top:100%;right:1rem;display:grid;gap:.55rem;padding:1rem;background:#133533;color:#fff;border-radius:.5rem;min-width:9rem;z-index:9999';
     nav.innerHTML=[['/','首页'],['/services/','服务'],['/cases/','案例'],['/teachers/','师资'],['/about/','关于'],['/faq/','常见问题'],['/contact/','联系我们']].map(([href,label])=>'<a href="#" data-offline-route="'+href+'">'+label+'</a>').join('');
     menuButton.closest('header').append(nav);
    }
    if(key==='/contact/'){
     const button=[...root.querySelectorAll('button')].find(e=>/问卷/.test(e.textContent));
     if(button){const a=document.createElement('a');a.className=button.className;a.href='#';a.dataset.offlineRoute='/demo-form.html';a.textContent=button.textContent;button.replaceWith(a);}
    }
   }
   const css=document.createElement('style');css.textContent='[hidden]{display:none!important} #offline-photo::backdrop{background:#000b}';
   root.querySelector('head').append(css);
   return '<!doctype html>'+root.outerHTML;
  },{keys,homepage,key});
  pages[key]=makeOffline(root,raw,origin,route,styles);
 }
 const payload=gzipSync(JSON.stringify({pages,styles})).toString('base64');
 writeFileSync(output,'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+'</title><style>'+wrapperCss+'</style><div id="status" role="status">正在打开预览…</div><iframe title="'+title+'" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe><script id="archive" type="application/octet-stream">'+payload+'</script><script>'+runtime+'</script></html>');
 const offline=await browser.newContext({offline:true,viewport:{width:1440,height:960}});
 const test=await offline.newPage();
 const errors=[];test.on('pageerror',e=>errors.push(e.message));
 await test.goto(pathToFileURL(path.resolve(output)).href);
 const pane=test.frameLocator('iframe');
 if(homepage){
  await pane.getByRole('heading',{name:'林屿',exact:true}).waitFor({timeout:10000});
  await pane.locator('a[data-offline-route="/projects.html"]:visible').first().click();
  await pane.getByRole('heading',{name:'雨水花园观测仪'}).first().waitFor({timeout:10000});
  await pane.locator('a[data-offline-route="/updates.html"]:visible').first().click();
  await pane.getByText('从空白到第一张观测图',{exact:true}).first().click();
  await pane.locator('#post-body').getByText('先写下要回答的问题',{exact:false}).waitFor({timeout:10000});
 }else{
  await pane.getByRole('heading',{name:'把下一步想清楚',exact:true}).waitFor({timeout:10000});
  await pane.getByRole('link',{name:'浏览服务',exact:true}).click();
  await pane.locator('a[data-offline-route="/services/baoyan/"]:visible').first().click();
  await pane.getByRole('heading',{name:'升学规划服务',exact:true}).waitFor({timeout:10000});
  const formUrl=pathToFileURL(path.resolve(output));formUrl.hash='/demo-form.html';
  await test.goto(formUrl.href);
  await pane.locator('#topic').selectOption('材料准备');
  await pane.getByRole('button',{name:'预览确认'}).click();
  await pane.getByText('演示完成。已选方向：材料准备。').waitFor({timeout:10000});
 }
 assert.deepEqual(errors,[]);
 await offline.close();
 console.log('Verified local file with networking disabled:',output);
 await context.close();http.close();
}
(async()=>{
 const b=await chromium.launch({args:['--no-sandbox']});
 try{ await pack(b,'home','output/homepage-preview.html','个人主页 · 离线预览'); await pack(b,'company','output/company-website-preview.html','企业官网 · 离线预览'); }
 finally{await b.close();}
})().catch(e=>{console.error(e);process.exit(1)});
