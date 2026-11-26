import { withBasePath } from "@/lib/site";

export type ContactChannel = {
  id: string;
  title: string;
  description: string;
  image: string;
  account?: string;
};

export const contactChannels: ContactChannel[] = ["咨询表单", "微信公众号", "微信视频号", "抖音"].map((title, index) => ({
  id: ["tencent-survey", "wechat-official", "wechat-video", "douyin"][index],
  title,
  description: "示例渠道。发布前替换为自己的公开入口。",
  image: withBasePath("/images/demo/channel.svg"),
}));
