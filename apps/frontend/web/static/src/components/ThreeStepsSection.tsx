import Image, { StaticImageData } from "next/image";
import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  image: StaticImageData;
}

interface ThreeStepsProps {
  mainHeadingPart1?: string;
  mainHeadingPart2?: string;
  steps: Step[];
}

const ThreeStepsSection: React.FC<ThreeStepsProps> = ({
  mainHeadingPart1 = "How to Get",
  mainHeadingPart2 = "Started with Your Order",
  steps,
}) => {
  // Define a palette of colors for the step numbers
  const stepColors = [
    "text-[#FF9C41] bg-[#FFCEA142] bg-opacity-[27%]",
    "text-[#009379] bg-[#EBF6F4] bg-opacity-[27%]",
    "text-[#386DF3] bg-[#DFEFFF] bg-opacity-[27%]",
  ];

  return (
    <section className="w-full">
      <div className="py-16">
        {/* Main Heading */}
        <h2 className="text-3xl bg-[#F8F5FB] font-gilroy md:text-4xl font-bold text-center pb-12 md:pb-16 md:pt-[64px]">
          {mainHeadingPart1}{" "}
          <span className="text-[#8123AD]">{mainHeadingPart2}</span>
        </h2>

        {steps.map((step, index) => {
          // Select color based on index, cycling through stepColors
          const colorClass = stepColors[index % stepColors.length];

          return (
            <div
              key={index}
              className={`${
                index % 2 === 0 ? "bg-[#F8F5FB]" : "bg-white"
              } py-1 md:pt-[65px]`}
            >
              <div className="container mx-[150px] px-4">
                <div
                  className={`flex flex-col ${
                    index % 2 === 0
                      ? "md:flex-row justify-between"
                      : "md:flex-row-reverse justify-between"
                  } items-center gap-8 md:gap-12`}
                >
                  {/* Image Section */}
                  <div className="w-[390px]">
                    <div className="relative h-64 md:h-[380px] rounded-xl overflow-hidden">
                      <Image
                        src={step.image}
                        alt={`Step ${step.number}`}
                        layout="fill"
                        sizes="(max-width: 395px) 100vw, 390px"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full md:w-1/2">
                    <div className="flex flex-col md:max-w-[587px] items-start gap-4">
                      <span
                        className={`${colorClass} px-[29px] py-[17px] rounded-full md:text-[50px] font-bold`}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-2xl fom md:text-[35px] font-bold">
                        {step.title}
                      </h3>
                      <p className=" text-[22px]">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ThreeStepsSection;
