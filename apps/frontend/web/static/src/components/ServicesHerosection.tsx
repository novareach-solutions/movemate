import Image, { StaticImageData } from "next/image";
import React from "react";

interface HeroSectionProps {
  image: StaticImageData;
  headingPart1: string;
  headingPart2: string;
  description: string;
  buttonText: string;
  children?: React.ReactNode;
}

const ServicesHerosection: React.FC<HeroSectionProps> = ({
  image,
  headingPart1 = "Fast, Reliable Delivery",
  headingPart2 = "at Your Fingertips!",
  description = "Make Vamoose your trusted choice for fast, reliable, and hassle-free delivery services tailored to meet your needs effortlessly!",
  buttonText = "Get Started",
  children,
}) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="lg:w-1/2 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-3">
            {headingPart1}{" "}
            <span className="text-[#8123AD]">{headingPart2}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
          <button className="bg-[#8123AD] text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold">
            {buttonText}
          </button>
          {children}
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 w-full">
          <div className="">
            <Image src={image} alt="Hero section image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHerosection;
