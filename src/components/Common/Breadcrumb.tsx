import { withBasePath } from "@/lib/site";

export default function Breadcrumb({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#173431] pt-32 pb-14 text-white sm:pt-36 sm:pb-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-right"
        style={{ backgroundImage: `url(${withBasePath("/images/demo/hero.png")})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#0b2221] via-[#0b2221]/93 to-[#0b2221]/50" />
      <div className="container">
        <nav aria-label="面包屑" className="mb-7 text-sm text-white/80">
          <a href={withBasePath("/")} className="underline underline-offset-4 hover:text-white">首页</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page">{pageName}</span>
        </nav>
        <p className="max-w-4xl text-4xl leading-tight font-bold text-white sm:text-5xl">{pageName}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
