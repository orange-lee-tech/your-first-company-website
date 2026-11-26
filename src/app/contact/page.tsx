import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "免费咨询 | 远岚教育工作室",
  description:
    "试用虚构品牌的咨询流程，了解企业官网如何承接服务咨询。",
  path: "/contact",
});

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="免费咨询"
        description="在本页体验咨询流程。所有渠道均为示例。"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
