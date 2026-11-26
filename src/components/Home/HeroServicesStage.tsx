import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import type { StudentCase } from "@/data/cases";
import type { Feature } from "@/types/feature";

type HomeHeroServicesStageProps = {
  features: Feature[];
  featuredCases: StudentCase[];
};

const HomeHeroServicesStage = ({
  features,
  featuredCases,
}: HomeHeroServicesStageProps) => {
  return (
    <>
      <Hero />
      <div className="bg-[#173d39]">
        <Features features={features} />
      </div>
      <div className="bg-[#254d54]">
        <Testimonials featuredCases={featuredCases} />
      </div>
    </>
  );
};

export default HomeHeroServicesStage;
