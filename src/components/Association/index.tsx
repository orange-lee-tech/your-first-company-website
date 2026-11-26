import { departments } from "@/data/association";
import { withBasePath } from "@/lib/site";
import type { ReactNode } from "react";

type Action = { label: string; href: string };

export function AssociationHero({ eyebrow, title, description, image, actions }: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  actions: Action[];
}) {
  return (
    <section className="association-hero">
      <div className="association-hero-photo" aria-hidden="true" style={{ backgroundImage: `url("${withBasePath(image)}")` }} />
      <div className="association-wrap association-hero-body">
        <p className="association-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="association-hero-description">{description}</p>
        <div className="association-actions">
          {actions.map(({ href, label }) => <a key={href} href={href.startsWith("#") ? href : withBasePath(href)}>{label}</a>)}
        </div>
      </div>
    </section>
  );
}

export function DepartmentCards() {
  return (
    <div className="association-departments">
      {departments.map(({ slug, name, summary, image }) => (
        <a className="association-department" href={withBasePath(`/departments/${slug}`)} key={slug}>
          <img src={withBasePath(image)} alt="" loading="lazy" decoding="async" />
          <div><h3>{name}</h3><p>{summary}</p><span aria-hidden="true">查看部门 →</span></div>
        </a>
      ))}
    </div>
  );
}

export function AssociationPage({ title, description, children }: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="association-main">
      <header className="association-page-intro">
        <div className="association-wrap"><h1>{title}</h1><p>{description}</p></div>
      </header>
      <div className="association-section"><div className="association-wrap">{children}</div></div>
    </main>
  );
}
