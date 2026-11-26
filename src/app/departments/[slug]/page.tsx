import { AssociationHero } from "@/components/Association";
import { associationName, departments } from "@/data/association";
import { buildPageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/site";
import { notFound } from "next/navigation";

type DepartmentPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return departments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = departments.find((item) => item.slug === slug);
  if (!department) notFound();
  return buildPageMetadata({ title: `${department.name}｜${associationName}`, description: department.summary, path: `/departments/${slug}` });
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = departments.find((item) => item.slug === slug);
  if (!department) notFound();

  return (
    <main className="association-main">
      <AssociationHero eyebrow={associationName} title={department.name} description={department.headline}
        image={department.image} actions={[{ label: "了解部门工作", href: "#work" }, { label: "查看所有部门", href: "/departments" }]} />
      <section id="work" className="association-section">
        <div className="association-wrap">
          <h2>部门工作</h2>
          <p className="association-lede">{department.summary}</p>
          <div className="association-work">
            {department.work.map(({ title, description }) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </section>
      <section className="association-section association-section-dark">
        <div className="association-wrap">
          <h2>第一次可以做什么</h2>
          <p className="association-lede">{department.firstStep}</p>
          <a href={withBasePath("/join")}>查看参与方式 →</a>
        </div>
      </section>
    </main>
  );
}
