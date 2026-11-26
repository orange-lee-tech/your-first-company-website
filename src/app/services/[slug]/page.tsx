import Breadcrumb from "@/components/Common/Breadcrumb";
import JsonLd from "@/components/SEO/JsonLd";
import { contentRepository } from "@/content/repository";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  siteConfig,
} from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

const detailBlockTones = [
  {
    card: "border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark",
    dot: "bg-primary",
  },
  {
    card: "border-yellow/20 bg-yellow/5 hover:border-yellow/50 hover:bg-white dark:border-yellow/20 dark:bg-white/10 dark:hover:bg-gray-dark",
    dot: "bg-yellow",
  },
];

const DetailBlock = ({
  title,
  items,
  toneIndex,
}: {
  title: string;
  items: string[];
  toneIndex: number;
}) => {
  const tone = detailBlockTones[toneIndex % detailBlockTones.length];

  return (
    <div className={`rounded-2xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${tone.card}`}>
      <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
        {title}
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3">
            <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${tone.dot}`} />
            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const pages = await contentRepository.listServicePages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await contentRepository.getService(slug);

  if (!service) {
    return buildPageMetadata({
      title: "服务详情 | 远岚教育工作室",
      description: siteConfig.description,
      path: `/services/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${service.page.title} | 远岚服务`,
    description: service.detail.subtitle || service.page.description,
    path: `/services/${slug}`,
  });
}

const ServiceDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const service = await contentRepository.getService(slug);

  if (!service) {
    notFound();
  }

  const { page, detail } = service;
  const path = `/services/${slug}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: page.heading,
    description: detail.subtitle,
    url: absoluteUrl(path),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "中国" },
    serviceType: page.title,
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "服务", path: "/services" },
    { name: page.title, path },
  ]);

  return (
    <>
      <JsonLd data={[serviceJsonLd, breadcrumbs]} />

      <Breadcrumb
        pageName={detail.title}
        description={detail.subtitle}
      />

      <section className="bg-[#f4f7f2] py-12 dark:bg-gray-dark md:py-14 lg:py-18">
        <div className="container">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <p className="mb-4 text-base font-semibold text-primary">
                服务方案
              </p>

              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
                {page.heading}
              </h1>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                {detail.customization}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-primary p-7 text-white shadow-three transition duration-300 hover:-translate-y-1 hover:shadow-three">
                <h2 className="mb-4 text-2xl font-bold">
                  先做匹配评估
                </h2>

                <p className="mb-6 text-base leading-relaxed text-white/80">
                  提交当前情况后，规划老师会结合背景、目标、时间和短板，判断更适合的服务路径。
                </p>

                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xs bg-white px-6 py-4 text-base font-semibold text-primary transition hover:bg-white/90"
                >
                  预约免费评估
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.highlights.map((item, index) => (
              <div
                key={item}
                className={`rounded-xl border p-5 text-center text-base font-semibold shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${
                  index % 2 === 0
                    ? "border-primary/10 bg-primary/5 text-primary dark:border-white/10 dark:bg-white/5"
                    : "border-yellow/20 bg-yellow/5 text-primary dark:border-yellow/20 dark:bg-white/10 dark:text-yellow"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <aside aria-label="服务页目录" className="self-start lg:sticky lg:top-28">
              <p className="mb-3 font-bold">本页目录</p>
              <ul className="flex flex-wrap gap-3 lg:flex-col">
                {["适合人群", "常见痛点", "服务目标", "服务内容", "服务流程", "服务周期", "交付成果", "配套资源"].map((label, index) => (
                  <li key={label}><a className="underline underline-offset-4" href={`#service-part-${index}`}>{label}</a></li>
                ))}
              </ul>
            </aside>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div id="service-part-0" className="scroll-mt-28"><DetailBlock title="适合人群" items={detail.audience} toneIndex={0} /></div>
            <div id="service-part-1" className="scroll-mt-28"><DetailBlock title="常见痛点" items={detail.painPoints} toneIndex={1} /></div>
            <div id="service-part-2" className="scroll-mt-28"><DetailBlock title="服务目标" items={detail.goals} toneIndex={2} /></div>
            <div id="service-part-3" className="scroll-mt-28"><DetailBlock title="服务内容" items={detail.serviceContent} toneIndex={3} /></div>
            <div id="service-part-4" className="scroll-mt-28"><DetailBlock title="服务流程" items={detail.process} toneIndex={4} /></div>
            <div id="service-part-5" className="scroll-mt-28"><DetailBlock title="服务周期" items={detail.cycle} toneIndex={5} /></div>
            <div id="service-part-6" className="scroll-mt-28"><DetailBlock title="交付成果" items={detail.deliverables} toneIndex={6} /></div>
            <div id="service-part-7" className="scroll-mt-28"><DetailBlock title="配套资源" items={detail.resources} toneIndex={7} /></div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark">
            <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
              私人订制体现
            </h2>

            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
              {detail.customization}
            </p>
          </div>

          <div className="mt-12 rounded-2xl bg-primary p-8 text-white md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  不确定自己是否适合「{detail.title}」？
                </h2>

                <p className="max-w-[720px] text-base leading-relaxed text-white/80">
                  带上你最想确认的一个问题和目前已有的材料，从明确下一步开始。
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-xs bg-white px-8 py-4 text-base font-semibold text-primary transition hover:bg-white/90"
              >
                预约免费评估
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
