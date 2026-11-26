# 你的第一个企业官网

首页以中南大学人工智能协会为应用示例，包含协会介绍、四个部门、活动、项目与资源和加入指引。网站由 Next.js 静态导出。原企业服务、案例、团队与咨询模块也可直接访问和用于教学。

## 预览和部署

使用 Node.js 24。在仓库根目录首次运行 `npm ci`，之后运行 `npm run preview`。命令会静态导出 HTML 和资源到 `out/` 并启动本地服务。打开终端显示的 `http://127.0.0.1:3000/`。通过本地地址预览 `out/index.html`，可使用样式、图片和子页面。修改后按 `Ctrl+C` 停止，再运行预览命令。虚构咨询表单只在浏览器中演示确认。

需要单独构建时运行 `npm run build`，验证导出可运行 `npm run verify:export`。

设置 `NEXT_PUBLIC_SITE_URL` 为你的完整域名后重新构建。将 `out/` 交给静态站点服务器。Nginx 站点可用 `try_files $uri $uri/ =404;`，并设 `index index.html;`。使用域名根目录部署时留空 `NEXT_PUBLIC_SITE_BASE_PATH`。

### 双击打开单文件预览

登录 GitHub，打开 [Actions](../../actions/workflows/verify.yml)，选一次成功的运行，或点击 **Run workflow** 构建。在该次运行底部的 **Artifacts** 下载 `company-website-preview-offline`。解压后打开里面唯一的 `company-website-preview.html`。用近期版本的 Edge 或 Chrome 即可，预览时无需安装 Node、开启本地服务或联网。

如果正在修改源码，先运行 `npm run build` 生成 `out/`，再运行 `python -m pip install lxml` 和 `python scripts/build-offline-preview.py`，文件输出到 `preview/company-website-preview.html`。标准静态站点产物仍可从 `company-website-preview` 下载。

| 模块 | 内容或界面入口 |
| --- | --- |
| 协会、四个部门及封面 | `src/data/association.ts`、`src/app/departments/`、`public/images/association/`（组织部沿用 `public/images/demo/hero.png`） |
| 协会区块与页面样式 | `src/components/Association/`、`src/styles/association.css` |
| 企业品牌、联系方式与 SEO | `src/data/about.ts`、`src/data/contactInfo.ts`、`src/lib/seo.ts` |
| 服务模块、路由和导航 | `src/data/services.ts`、`src/data/routePages.ts`、`src/data/navigation.ts` |
| 分类案例与详情 | `content/cases/`、`src/data/cases.ts` |
| 团队档案 | `src/data/teachers.ts`、`src/data/teacherDetails.ts` |
| 常见问题和咨询 | `src/data/faq.ts`、`src/data/contactChannels.ts`、`public/demo-form.html` |
| 首页图片和区块、服务侧边目录 | `public/images/demo/`、`src/components/Home/`、`src/app/services/[slug]/page.tsx` |

协会开屏图为生成的场景示意。活动日期、地点和报名渠道待协会公开确认后填写。企业教学模块可通过 `/services/`、`/cases/`、`/teachers/`、`/faq/`、`/contact/` 继续访问。

[项目日志](PROJECT_LOG.md)
