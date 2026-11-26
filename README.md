# 你的第一个企业官网

以虚构的「远岚教育工作室」为例，提供可组合的企业官网功能和一套简体中文界面。网站由 Next.js 静态导出，共享服务、案例与团队内容层。

## 预览和部署

使用 Node.js 24 LTS。运行 `npm ci`、`npm run build`、`npm run verify:export`，再运行 `npm start` 并访问 `http://127.0.0.1:3000/`。虚构咨询表单只在浏览器中演示确认，不会发送表单数据。

设置 `NEXT_PUBLIC_SITE_URL` 为你的完整域名后重新构建。将 `out/` 交给静态站点服务器。Nginx 站点可用 `try_files $uri $uri/ =404;`，并设 `index index.html;`。使用域名根目录部署时留空 `NEXT_PUBLIC_SITE_BASE_PATH`。

| 模块 | 内容或界面入口 |
| --- | --- |
| 企业品牌、联系方式与 SEO | `src/data/about.ts`、`src/data/contactInfo.ts`、`src/lib/seo.ts` |
| 服务模块、路由和导航 | `src/data/services.ts`、`src/data/routePages.ts`、`src/data/navigation.ts` |
| 分类案例与详情 | `content/cases/`、`src/data/cases.ts` |
| 团队档案 | `src/data/teachers.ts`、`src/data/teacherDetails.ts` |
| 常见问题和咨询 | `src/data/faq.ts`、`src/data/contactChannels.ts`、`public/demo-form.html` |
| 首页图片和区块、服务侧边目录 | `public/images/demo/`、`src/components/Home/`、`src/app/services/[slug]/page.tsx` |

完成一次练习可从添加示例案例开始，然后检查分类页、首页和咨询入口。首页照片为生成的教学素材，其他配图为示例图示。发布正式企业网站前换成自己的品牌、素材和咨询入口。

[项目日志](PROJECT_LOG.md)
