import { AssociationPage } from "@/components/Association";
import { buildPageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/site";

const description = "用一份可重复的练习开始，逐步把过程和成果整理成下一位同学能继续使用的资料。";
export const metadata = buildPageMetadata({ title: "项目与资源｜中南大学人工智能协会", description, path: "/resources" });

export default function Page() {
  return (
    <AssociationPage title="项目与资源" description={description}>
      <div className="association-work">
        <article><h2>AI 工具入门</h2><p>从校园学习的一项具体任务入手，写下需求、验证输出，整理可复用的操作步骤。</p></article>
        <article><h2>网站与自动化实践</h2><p>把需求拆成栏目、内容和可演示功能。网站项目可先从四部门页面与活动信息模块着手。</p></article>
        <article><h2>活动筹备模板</h2><p>用目标、参与人、议程、资源清单和复盘问题，把一次活动交接给下一组同学。</p></article>
      </div>
      <p className="association-next"><a href={withBasePath("/departments/technology")}>了解技术部的项目训练 →</a></p>
    </AssociationPage>
  );
}
