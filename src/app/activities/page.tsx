import { AssociationPage } from "@/components/Association";
import { buildPageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/site";

const description = "关注适合不同基础的交流、动手实践与作品展示。下列为活动方向，具体时间与地点以协会公告为准。";
export const metadata = buildPageMetadata({ title: "活动｜中南大学人工智能协会", description, path: "/activities" });

export default function Page() {
  return (
    <AssociationPage title="活动" description={description}>
      <div className="association-work">
        <article><h2>公开技术分享</h2><p>用可观察的例子理解一个 AI 概念，或了解同学怎样把日常需求做成小工具。</p></article>
        <article><h2>动手工作坊</h2><p>带上电脑跟练。从一个明确的小任务开始，当场完成一个可以打开、运行或分享的成果。</p></article>
        <article><h2>实践与作品交流</h2><p>从需求、方案到演示复盘，听队友讲讲哪些做法有效，哪些环节可以改进。</p></article>
      </div>
      <p className="association-next"><a href={withBasePath("/join")}>查看参与方式 →</a></p>
    </AssociationPage>
  );
}
