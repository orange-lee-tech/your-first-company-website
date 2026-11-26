export type FAQItem = {
  id: string;
  question: string;
  answer: string[];
};

export const faqItems: FAQItem[] = [
  {
    "id": "service-process",
    "question": "如何开始？",
    "answer": [
      "先浏览服务说明和示例案例，再从联系页查看咨询流程。"
    ]
  },
  {
    "id": "scope",
    "question": "能获得什么？",
    "answer": [
      "各服务页列出了阶段任务和示例交付物，实际范围需由网站运营方确认。"
    ]
  },
  {
    "id": "demo",
    "question": "这里能提交真实资料吗？",
    "answer": [
      "当前是教学网站。演示咨询在本地页面完成，不保存或发送输入。"
    ]
  }
];
