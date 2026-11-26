export type NavChild = {
  title: string;
  path: string;
  description?: string;
};

export type NavItem = {
  title: string;
  path: string;
  description?: string;
  children?: NavChild[];
};

import { servicePages, casePages } from "./routePages";

export const serviceNavItems: NavChild[] = servicePages.map(({ title, slug, description }) => ({ title, path: `/services/${slug}`, description }));

export const caseNavItems: NavChild[] = casePages.map(({ title, slug, description }) => ({ title, path: `/cases/${slug}`, description }));

export const siteNavItems: NavItem[] = [
  {
    title: "首页",
    path: "/",
    description: "返回远岚教育工作室首页",
  },
  {
    title: "服务",
    path: "/services",
    description: "查看六大服务方向",
    children: serviceNavItems,
  },
  {
    title: "案例",
    path: "/cases",
    description: "查看按类别组织的虚构案例",
    children: caseNavItems,
  },
  {
    title: "师资",
    path: "/teachers",
    description: "查看导师与教研团队",
  },
  {
    title: "常见问题",
    path: "/faq",
    description: "了解服务流程、周期、收费与合规边界",
  },
  {
    title: "联系我们",
    path: "/contact",
    description: "预约免费一对一评估",
  },
];