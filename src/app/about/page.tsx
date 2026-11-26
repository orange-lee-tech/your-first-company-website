import { AssociationPage } from "@/components/Association";
import { buildPageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/site";

const description = "我们希望让更多同学通过分享与项目，把人工智能真正用到学习和实践里。";
export const metadata = buildPageMetadata({ title: "关于协会｜中南大学人工智能协会", description, path: "/about" });

export default function Page() {
  return (
    <AssociationPage title="关于协会" description={description}>
      <div className="association-work">
        <article><h2>技术科普</h2><p>从身边的任务出发，理解常见工具和模型怎样工作，以及怎样判断输出是否可靠。</p></article>
        <article><h2>校园协作</h2><p>组织、宣传、技术和外联四个部门共同支持活动，让不同专业、不同基础的同学一起完成一件事。</p></article>
        <article><h2>从实践到复用</h2><p>用工程记录、公开分享和成果展示留下可复用资料，方便下一位同学继续完善。</p></article>
      </div>
      <p className="association-next"><a href={withBasePath("/departments")}>认识协会部门 →</a></p>
    </AssociationPage>
  );
}
