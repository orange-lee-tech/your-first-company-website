import { AssociationPage } from "@/components/Association";
import { buildPageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/site";

const description = "可以先参加活动，再根据自己的兴趣和可投入的时间选择部门。招新时间和报名渠道以协会发布的公告为准。";
export const metadata = buildPageMetadata({ title: "加入我们｜中南大学人工智能协会", description, path: "/join" });

export default function Page() {
  return (
    <AssociationPage title="加入我们" description={description}>
      <div className="association-work">
        <article><h2>了解部门</h2><p>看看四个部门日常在做什么，挑一项你愿意参与的具体任务。</p></article>
        <article><h2>带一个兴趣或问题</h2><p>你可以从一项技术练习、一张活动海报或一个合作点子开始。</p></article>
        <article><h2>关注招新安排</h2><p>网站当前提供流程说明。收到协会正式公告后，再通过公告指定的渠道提交报名信息。</p></article>
      </div>
      <p className="association-next"><a href={withBasePath("/departments")}>查看四个部门 →</a></p>
    </AssociationPage>
  );
}
