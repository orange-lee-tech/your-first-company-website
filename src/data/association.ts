export const associationName = "中南大学人工智能协会";
export const associationDescription = "面向中南大学同学的人工智能学习与实践社区。一起做项目、参加活动，也把有用的实践经验分享给更多同学。";
export const campusImage = "/images/association/campus.jpg";

export const departments = [
  {
    slug: "organization",
    name: "组织部",
    headline: "把想做的事组织起来",
    summary: "连接成员、活动与协作流程，让一次分享、一场工作坊或一个跨部门项目有人领头，也有清楚的交接。",
    image: "/images/demo/hero.png",
    work: [
      { title: "成员与分工", description: "梳理成员兴趣和可投入时间，为活动安排主持、签到、场地和后勤协作。" },
      { title: "活动统筹", description: "把活动拆成筹备、执行、复盘三个阶段，汇总场地、物料和各部门的交付时间。" },
      { title: "复盘与交接", description: "保存活动清单、反馈与改进项，让下一位同学能接着做。" },
    ],
    firstStep: "从协助一场活动开始。和负责人一起检查流程表、安排现场分工，并记录当天可以改进的环节。",
  },
  {
    slug: "publicity",
    name: "宣传部",
    headline: "把技术故事讲给更多人听",
    summary: "围绕活动与项目制作海报、图文和影像，让同学能快速看懂一场活动在做什么、怎样参与。",
    image: "/images/association/publicity.jpg",
    work: [
      { title: "活动视觉", description: "为讲座、工作坊和招新设计主视觉，统筹海报、封面及现场展示素材。" },
      { title: "内容采编", description: "从成员访谈和演示中整理一手材料，用易懂的文字解释技术实践。" },
      { title: "影像归档", description: "记录活动现场与作品演示，整理可发布的图文、视频和素材说明。" },
    ],
    firstStep: "挑一个项目，采访两位参与者，做一张信息清楚的活动海报或一篇作品介绍。",
  },
  {
    slug: "technology",
    name: "技术部",
    headline: "把人工智能学成能展示的作品",
    summary: "从工具入门、技术科普到原型开发和竞赛实践，让每位同学都能找到一个可以动手的任务。",
    image: "/images/association/technology.jpg",
    work: [
      { title: "技术分享与科普", description: "用直观示例讲解常见的 AI 工具、模型和工作流，给新成员可重复操作的练习。" },
      { title: "项目实训", description: "围绕真实需求做网页、自动化或数据小项目，记录分工、版本与演示结果。" },
      { title: "竞赛与成果转化", description: "收集方向、组建小队，把可复用的方案、原型和文档沉淀为训练材料。" },
    ],
    firstStep: "带着一个想解决的小问题来，选一份入门练习做出可演示的版本，然后记录搭建过程。",
  },
  {
    slug: "external-relations",
    name: "外联部",
    headline: "把校园里的创意带到更大的现场",
    summary: "对接校内外社团、分享嘉宾与实践项目，帮助合作双方明确需求、分工和可交付的成果。",
    image: "/images/association/external-relations.jpg",
    work: [
      { title: "跨社团协作", description: "围绕公开课、交流会与工作坊对接校内伙伴，共同确定受众、议程和支持需求。" },
      { title: "嘉宾与资源对接", description: "准备沟通材料，确认分享主题、现场安排与内容授权。" },
      { title: "合作跟进", description: "归纳需求与行动项，回收活动反馈，并把已确认的资源交给下次活动使用。" },
    ],
    firstStep: "写一页合作提案，讲清楚合作对象、活动目标与双方可以承担的任务。",
  },
] as const;

export const associationLinks = [
  { title: "活动", path: "/activities" },
  { title: "项目与资源", path: "/resources" },
  { title: "关于协会", path: "/about" },
  { title: "加入我们", path: "/join" },
];
