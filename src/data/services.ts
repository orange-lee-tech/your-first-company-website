export type ServiceCategory =
  | "baoyan"
  | "overseas-undergrad-master"
  | "domestic-phd"
  | "overseas-funded-phd"
  | "undergrad-career"
  | "elite-career";

export type ServiceDetail = {
  slug: ServiceCategory;
  title: string;
  subtitle: string;
  audience: string[];
  painPoints: string[];
  goals: string[];
  serviceContent: string[];
  process: string[];
  cycle: string[];
  deliverables: string[];
  resources: string[];
  customization: string;
  boundary: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    "slug": "baoyan",
    "title": "升学规划",
    "subtitle": "梳理重点学期、材料准备和阶段目标。",
    "audience": [
      "需要把目标拆成下一步的学习者"
    ],
    "painPoints": [
      "信息分散，执行顺序不清晰"
    ],
    "goals": [
      "明确一个可复查的阶段目标"
    ],
    "serviceContent": [
      "梳理重点学期、材料准备和阶段目标。",
      "目标方向表",
      "阶段复盘"
    ],
    "process": [
      "初次沟通",
      "确认任务",
      "按清单执行",
      "交付复盘"
    ],
    "cycle": [
      "以确认的任务范围为准"
    ],
    "deliverables": [
      "目标方向表",
      "下一步行动清单"
    ],
    "resources": [
      "公开信息与示例模板"
    ],
    "customization": "根据准备时间与可用材料约定任务范围。",
    "boundary": "此站为教学示例，不承诺录取、就业或其他结果。"
  },
  {
    "slug": "overseas-undergrad-master",
    "title": "海外院校申请",
    "subtitle": "比较院校公开要求，安排材料与时间线。",
    "audience": [
      "需要把目标拆成下一步的学习者"
    ],
    "painPoints": [
      "信息分散，执行顺序不清晰"
    ],
    "goals": [
      "明确一个可复查的阶段目标"
    ],
    "serviceContent": [
      "比较院校公开要求，安排材料与时间线。",
      "院校比较表",
      "阶段复盘"
    ],
    "process": [
      "初次沟通",
      "确认任务",
      "按清单执行",
      "交付复盘"
    ],
    "cycle": [
      "以确认的任务范围为准"
    ],
    "deliverables": [
      "院校比较表",
      "下一步行动清单"
    ],
    "resources": [
      "公开信息与示例模板"
    ],
    "customization": "根据准备时间与可用材料约定任务范围。",
    "boundary": "此站为教学示例，不承诺录取、就业或其他结果。"
  },
  {
    "slug": "domestic-phd",
    "title": "研究方向咨询",
    "subtitle": "梳理研究兴趣，规划阅读与项目准备。",
    "audience": [
      "需要把目标拆成下一步的学习者"
    ],
    "painPoints": [
      "信息分散，执行顺序不清晰"
    ],
    "goals": [
      "明确一个可复查的阶段目标"
    ],
    "serviceContent": [
      "梳理研究兴趣，规划阅读与项目准备。",
      "方向调研笔记",
      "阶段复盘"
    ],
    "process": [
      "初次沟通",
      "确认任务",
      "按清单执行",
      "交付复盘"
    ],
    "cycle": [
      "以确认的任务范围为准"
    ],
    "deliverables": [
      "方向调研笔记",
      "下一步行动清单"
    ],
    "resources": [
      "公开信息与示例模板"
    ],
    "customization": "根据准备时间与可用材料约定任务范围。",
    "boundary": "此站为教学示例，不承诺录取、就业或其他结果。"
  },
  {
    "slug": "overseas-funded-phd",
    "title": "访问与奖学金准备",
    "subtitle": "汇总公开项目和申请节点。",
    "audience": [
      "需要把目标拆成下一步的学习者"
    ],
    "painPoints": [
      "信息分散，执行顺序不清晰"
    ],
    "goals": [
      "明确一个可复查的阶段目标"
    ],
    "serviceContent": [
      "汇总公开项目和申请节点。",
      "申请计划表",
      "阶段复盘"
    ],
    "process": [
      "初次沟通",
      "确认任务",
      "按清单执行",
      "交付复盘"
    ],
    "cycle": [
      "以确认的任务范围为准"
    ],
    "deliverables": [
      "申请计划表",
      "下一步行动清单"
    ],
    "resources": [
      "公开信息与示例模板"
    ],
    "customization": "根据准备时间与可用材料约定任务范围。",
    "boundary": "此站为教学示例，不承诺录取、就业或其他结果。"
  },
  {
    "slug": "undergrad-career",
    "title": "求职材料准备",
    "subtitle": "整理项目证据和简历版本。",
    "audience": [
      "需要把目标拆成下一步的学习者"
    ],
    "painPoints": [
      "信息分散，执行顺序不清晰"
    ],
    "goals": [
      "明确一个可复查的阶段目标"
    ],
    "serviceContent": [
      "整理项目证据和简历版本。",
      "简历修改清单",
      "阶段复盘"
    ],
    "process": [
      "初次沟通",
      "确认任务",
      "按清单执行",
      "交付复盘"
    ],
    "cycle": [
      "以确认的任务范围为准"
    ],
    "deliverables": [
      "简历修改清单",
      "下一步行动清单"
    ],
    "resources": [
      "公开信息与示例模板"
    ],
    "customization": "根据准备时间与可用材料约定任务范围。",
    "boundary": "此站为教学示例，不承诺录取、就业或其他结果。"
  },
  {
    "slug": "elite-career",
    "title": "面试与职业探索",
    "subtitle": "用模拟提问和岗位调研形成下一步。",
    "audience": [
      "需要把目标拆成下一步的学习者"
    ],
    "painPoints": [
      "信息分散，执行顺序不清晰"
    ],
    "goals": [
      "明确一个可复查的阶段目标"
    ],
    "serviceContent": [
      "用模拟提问和岗位调研形成下一步。",
      "模拟面试复盘",
      "阶段复盘"
    ],
    "process": [
      "初次沟通",
      "确认任务",
      "按清单执行",
      "交付复盘"
    ],
    "cycle": [
      "以确认的任务范围为准"
    ],
    "deliverables": [
      "模拟面试复盘",
      "下一步行动清单"
    ],
    "resources": [
      "公开信息与示例模板"
    ],
    "customization": "根据准备时间与可用材料约定任务范围。",
    "boundary": "此站为教学示例，不承诺录取、就业或其他结果。"
  }
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((item) => item.slug === slug);
}