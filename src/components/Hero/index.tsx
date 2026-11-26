import { withBasePath } from "@/lib/site";

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-[#173431] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-[center_right]"
        style={{ backgroundImage: `url(${withBasePath("/images/demo/hero.png")})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#0b2221]/90 via-[#0b2221]/65 to-[#0b2221]/16" />
      <div className="container pb-16 pt-36 sm:pb-24">
        <p className="mb-4 font-semibold tracking-wide text-yellow">远岚教育工作室 · 教学示例</p>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-7xl">把下一步想清楚</h1>
        <p className="my-6 max-w-xl text-lg leading-relaxed sm:text-xl">从方向判断、材料准备到行动复盘，把升学与求职拆成可执行的小步。</p>
        <div className="flex flex-wrap gap-4">
          <a className="rounded bg-yellow px-5 py-3 font-semibold text-[#102c29]" href={withBasePath("/services")}>浏览服务</a>
          <a className="rounded border border-white/70 px-5 py-3 font-semibold" href={withBasePath("/contact")}>了解咨询流程</a>
        </div>
      </div>
    </section>
  );
}
