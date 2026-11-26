export type RoutePage = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  highlights: string[];
};

export const servicePages: RoutePage[] = [
  {
    "slug": "baoyan",
    "title": "升学规划",
    "heading": "升学规划服务",
    "description": "先确认专业方向及可用时间，再整理课程、实践与申请材料。",
    "highlights": [
      "目标方向表",
      "公开通知",
      "材料版本",
      "提交时间"
    ]
  },
  {
    "slug": "overseas-undergrad-master",
    "title": "海外院校申请",
    "heading": "海外院校申请服务",
    "description": "先把预算、地区和英文准备放在同一张比较表里，再安排申请顺序。",
    "highlights": [
      "院校比较表",
      "课程要求",
      "材料要求",
      "语言准备"
    ]
  },
  {
    "slug": "domestic-phd",
    "title": "研究方向咨询",
    "heading": "研究方向咨询服务",
    "description": "将一段宽泛的研究兴趣压缩成可阅读、可讨论的研究问题。",
    "highlights": [
      "方向调研笔记",
      "代表文献",
      "公开导师方向",
      "问题陈述"
    ]
  },
  {
    "slug": "overseas-funded-phd",
    "title": "访问与奖学金准备",
    "heading": "访问与奖学金准备服务",
    "description": "先区分访问、交换与奖学金项目，再逐项核对公开项目要求和时间。",
    "highlights": [
      "申请计划表",
      "公开资格",
      "资助范围",
      "申请材料"
    ]
  },
  {
    "slug": "undergrad-career",
    "title": "求职材料准备",
    "heading": "求职材料准备服务",
    "description": "围绕一个岗位整理真实项目证据，形成可投递、可复查的材料。",
    "highlights": [
      "简历修改清单",
      "岗位要求",
      "经历证据",
      "简历版本"
    ]
  },
  {
    "slug": "elite-career",
    "title": "面试与职业探索",
    "heading": "面试与职业探索服务",
    "description": "用岗位比较和试答复盘形成职业选择，而不是机械背题。",
    "highlights": [
      "模拟面试复盘",
      "方向假设",
      "岗位比较",
      "模拟问题"
    ]
  }
];

export const casePages: RoutePage[] = [
  {
    "slug": "baoyan",
    "title": "升学规划",
    "heading": "升学规划案例",
    "description": "虚构示例：课程与活动材料零散，完成阶段目标与材料清单。",
    "highlights": [
      "初始情况",
      "行动和结果"
    ]
  },
  {
    "slug": "study-abroad",
    "title": "海外院校申请",
    "heading": "海外院校申请案例",
    "description": "虚构示例：选校信息难以对比，完成院校与时间节点对照。",
    "highlights": [
      "初始情况",
      "行动和结果"
    ]
  },
  {
    "slug": "phd-application",
    "title": "研究方向咨询",
    "heading": "研究方向咨询案例",
    "description": "虚构示例：兴趣宽泛，缺少明确问题，形成阅读计划和两个待验证问题。",
    "highlights": [
      "初始情况",
      "行动和结果"
    ]
  },
  {
    "slug": "career-coaching",
    "title": "就业准备",
    "heading": "就业准备案例",
    "description": "虚构示例：简历只有职责，没有成果证据，完成项目描述和模拟面试复盘。",
    "highlights": [
      "初始情况",
      "行动和结果"
    ]
  }
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export function getCasePage(slug: string) {
  return casePages.find((page) => page.slug === slug);
}
