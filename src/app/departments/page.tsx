import { AssociationPage, DepartmentCards } from "@/components/Association";
import { buildPageMetadata } from "@/lib/seo";

const description = "了解组织部、宣传部、技术部和外联部的分工，找到适合自己参与的任务。";
export const metadata = buildPageMetadata({ title: "部门｜中南大学人工智能协会", description, path: "/departments" });

export default function Departments() {
  return <AssociationPage title="部门" description={description}><DepartmentCards /></AssociationPage>;
}
