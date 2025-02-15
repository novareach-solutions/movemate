import Image, { StaticImageData } from "next/image";
import React from "react";

interface HeroSectionProps {
  image: StaticImageData;
  headingPart1?: string;
  headingPart2?: string;
  description?: string;
  /**
   * Making the button text optional. If not provided, the button will not be displayed.
   */
  buttonText?: string;
  children?: React.ReactNode;
}

const ServicesHerosection: React.FC<HeroSectionProps> = ({
  image,
  headingPart1 = "",
  headingPart2 = "",
  description = "",
  buttonText,
  children,
}) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="lg:w-1/2 text-left">
          {(headingPart1 || headingPart2) && (
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-3">
              {headingPart1}{" "}
              <span className="text-[#8123AD]">{headingPart2}</span>
            </h1>
          )}
          {description && (
            <p className="text-lg text-gray-600 mb-8">{description}</p>
          )}

          {/* Only render the button if buttonText is provided */}
          {buttonText && (
            <button className="bg-[#8123AD] text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold">
              {buttonText}
            </button>
          )}

          {/* Children can be used for custom content (e.g. Car Towing form, etc.) */}
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
