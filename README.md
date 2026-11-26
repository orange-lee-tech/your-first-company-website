# 你的第一个企业官网

以虚构的「远岚教育工作室」为例，提供可组合的企业官网功能和一套简体中文界面。网站由 Next.js 静态导出，共享服务、案例与团队内容层。

## 预览和部署

使用 Node.js 24。在仓库根目录首次运行 `npm ci`，之后运行 `npm run preview`。命令会静态导出 HTML 和资源到 `out/` 并启动本地服务。打开终端显示的 `http://127.0.0.1:3000/`。通过本地地址预览 `out/index.html`，可使用样式、图片和子页面。修改后按 `Ctrl+C` 停止，再运行预览命令。虚构咨询表单只在浏览器中演示确认。

需要单独构建时运行 `npm run build`，验证导出可运行 `npm run verify:export`。

设置 `NEXT_PUBLIC_SITE_URL` 为你的完整域名后重新构建。将 `out/` 交给静态站点服务器。Nginx 站点可用 `try_files $uri $uri/ =404;`，并设 `index index.html;`。使用域名根目录部署时留空 `NEXT_PUBLIC_SITE_BASE_PATH`。

### 下载已构建的预览

登录 GitHub，打开 [Actions](../../actions/workflows/verify.yml)，选择一次成功的运行，在底部 **Artifacts** 下载 `company-website-preview`。也可在该工作流页面点击 **Run workflow** 重新构建。ZIP 解压后，在包含 `index.html` 的目录运行 `npx --yes http-server . -a 127.0.0.1 -p 8080`，然后打开 `http://127.0.0.1:8080/`。

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
