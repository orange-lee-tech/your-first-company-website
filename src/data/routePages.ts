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
    "description": "梳理重点学期、材料准备和阶段目标。",
    "highlights": [
      "目标方向表",
      "阶段计划"
    ]
  },
  {
    "slug": "overseas-undergrad-master",
    "title": "海外院校申请",
    "heading": "海外院校申请服务",
    "description": "比较院校公开要求，安排材料与时间线。",
    "highlights": [
      "院校比较表",
      "阶段计划"
    ]
  },
  {
    "slug": "domestic-phd",
    "title": "研究方向咨询",
    "heading": "研究方向咨询服务",
    "description": "梳理研究兴趣，规划阅读与项目准备。",
    "highlights": [
      "方向调研笔记",
      "阶段计划"
    ]
  },
  {
    "slug": "overseas-funded-phd",
    "title": "访问与奖学金准备",
    "heading": "访问与奖学金准备服务",
    "description": "汇总公开项目和申请节点。",
    "highlights": [
      "申请计划表",
      "阶段计划"
    ]
  },
  {
    "slug": "undergrad-career",
    "title": "求职材料准备",
    "heading": "求职材料准备服务",
    "description": "整理项目证据和简历版本。",
    "highlights": [
      "简历修改清单",
      "阶段计划"
    ]
  },
  {
    "slug": "elite-career",
    "title": "面试与职业探索",
    "heading": "面试与职业探索服务",
    "description": "用模拟提问和岗位调研形成下一步。",
    "highlights": [
      "模拟面试复盘",
      "阶段计划"
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
