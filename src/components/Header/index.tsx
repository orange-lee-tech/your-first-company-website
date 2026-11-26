import { associationLinks, associationName, departments } from "@/data/association";
import { withBasePath } from "@/lib/site";

export default function Header() {
  return (
    <header className="association-header">
      <div className="association-wrap association-bar">
        <a href={withBasePath("/")} className="association-brand"><span aria-hidden="true">AI</span>{associationName}</a>
        <nav aria-label="全站导航" className="association-nav">
          <a href={withBasePath("/")}>首页</a>
          <details className="association-nav-departments">
            <summary>部门</summary>
            <div className="association-nav-popover">
              {departments.map(({ slug, name }) => <a key={slug} href={withBasePath(`/departments/${slug}`)}>{name}</a>)}
              <a href={withBasePath("/departments")}>部门总览</a>
            </div>
          </details>
          {associationLinks.map(({ title, path }) => <a key={path} href={withBasePath(path)}>{title}</a>)}
        </nav>
      </div>
    </header>
  );
}
