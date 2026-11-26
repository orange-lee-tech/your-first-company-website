import HomeContactCTA from "@/components/Home/HomeContactCTA";
import HomeHeroServicesStage from "@/components/Home/HeroServicesStage";
import TeacherCarousel from "@/components/Teachers/TeacherCarousel";
import { contentRepository } from "@/content/repository";
import { buildPageMetadata, siteConfig } from "@/lib/seo";
import type { Feature } from "@/types/feature";

export const metadata = buildPageMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  path: "/",
});

export default async function Home() {
  const [services, cases, teachers] = await Promise.all([
    contentRepository.listServices(),
    contentRepository.listCases(),
    contentRepository.listFeaturedTeachers(),
  ]);

  const features: Feature[] = services.map(({ detail }, index) => ({
    id: index + 1,
    title: detail.title,
    audience: detail.audience[0],
    keywords: detail.serviceContent.slice(0, 3),
    path: `/services/${detail.slug}`,
  }));

  const featuredCases = cases.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      <HomeHeroServicesStage
        features={features}
        featuredCases={featuredCases}
      />
      <TeacherCarousel teachers={teachers} />
      <HomeContactCTA />
    </>
  );
}
