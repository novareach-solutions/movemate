import Image, { StaticImageData } from "next/image";
import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  image: StaticImageData;
}

interface ThreeStepsProps {
  mainHeadingPart1: string;
  mainHeadingPart2: string;
  steps: Step[];
}

const ThreeStepsSection: React.FC<ThreeStepsProps> = ({
  mainHeadingPart1 = "How to Get",
  mainHeadingPart2 = "Started with Your Order",
  steps,
}) => {
  return (
    <section className="w-full">
      <div className=" py-16">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          {mainHeadingPart1}{" "}
          <span className="text-purple-600">{mainHeadingPart2}</span>
        </h2>

        {steps.map((step, index) => (
          <div
            key={index}
            className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} py-12 md:py-16`}
          >
            <div className="container mx-auto px-4">
              <div
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={`Step ${step.number}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <div className="flex flex-col items-start gap-4">
                    <span className="text-purple-600 text-2xl font-bold">
                      {step.number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeStepsSection;
