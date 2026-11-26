import { AssociationHero, DepartmentCards } from "@/components/Association";
import { associationDescription, associationName, campusImage } from "@/data/association";
import { buildPageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/site";

export const metadata = buildPageMetadata({ title: associationName, description: associationDescription, path: "/" });

export default function Home() {
  return (
    <main className="association-main">
      <AssociationHero eyebrow="校园 AI 学习与实践社区" title={associationName} description={associationDescription}
        image={campusImage} actions={[{ label: "认识四个部门", href: "#departments" }, { label: "加入我们", href: "/join" }]} />
      <section id="departments" className="association-section">
        <div className="association-wrap">
          <h2>认识四个部门</h2>
          <p className="association-lede">从统筹一场活动到交付一件作品，每个部门都有可以上手的工作。</p>
          <DepartmentCards />
        </div>
      </section>
      <section className="association-section association-section-dark">
        <div className="association-wrap association-split">
          <div><h2>从一场活动开始</h2><p>公开分享、动手工作坊、跨部门项目和作品交流，适合不同基础的同学参与。</p>
            <a href={withBasePath("/activities")}>查看活动方向 →</a></div>
          <div><h2>把经验留给下一位同学</h2><p>把代码、复盘、入门指导和活动工具整理成可继续使用的材料。</p>
            <a href={withBasePath("/resources")}>探索项目与资源 →</a></div>
        </div>
      </section>
    </main>
  );
}
