import { associationLinks, associationName, departments } from "@/data/association";
import { withBasePath } from "@/lib/site";

const quickLinks = [{ title: "首页", path: "/" }, { title: "部门总览", path: "/departments" }, ...associationLinks];
const channels = ["微信公众号", "微信视频号", "抖音"];

export default function Footer() {
  return (
    <footer className="association-footer">
      <div className="association-wrap">
        <div className="association-footer-main">
          <section>
            <a className="association-footer-brand" href={withBasePath("/")}>{associationName}</a>
            <p>面向校内同学，组织技术分享、动手实践和跨院交流。</p>
            <div className="association-footer-mission">
              <span>协会理念</span>
              <strong>把人工智能用到学习与实践中</strong>
            </div>
          </section>
          <nav aria-label="快速导航">
            <h2>快速导航</h2>
            <ul>{quickLinks.map(({ path, title }) => <li key={path}><a href={withBasePath(path)}>{title}</a></li>)}</ul>
          </nav>
          <nav aria-label="协会部门">
            <h2>协会部门</h2>
            <ul>{departments.map(({ slug, name }) => <li key={slug}><a href={withBasePath(`/departments/${slug}`)}>{name}</a></li>)}</ul>
          </nav>
          <section>
            <h2>联系与参与</h2>
            <p>招新、活动报名及对外合作渠道以协会发布的公告为准。</p>
            <a className="association-footer-cta" href={withBasePath("/join")}>查看参与方式 →</a>
          </section>
        </div>
        <section className="association-footer-social" aria-labelledby="association-social-heading">
          <div>
            <h2 id="association-social-heading">关注协会</h2>
            <p>关注入口将在渠道确认后更新。</p>
          </div>
          <ul>{channels.map((channel) => (
            <li key={channel}>
              <span className="association-footer-qr" aria-hidden="true">二维码<br />占位</span>
              <h3>{channel}</h3>
            </li>
          ))}</ul>
        </section>
        <div className="association-footer-legal">
          <p>活动日期、地点及报名信息以协会正式公告为准。</p>
          <p>© {new Date().getFullYear()} {associationName}</p>
        </div>
      </div>
    </footer>
  );
}
