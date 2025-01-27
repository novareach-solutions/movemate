import React from "react";
import Image, { StaticImageData } from "next/image";

interface ContentLayoutProps {
  title: string;
  text: string;
  highlightedText: string;
  description: string;
  buttonText: string;
  buttonIcon: StaticImageData;
  sectionImage: StaticImageData;
  background: string;
  sectionAlt?: string;
  reverse?: boolean;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  text,
  highlightedText,
  description,
  buttonText,
  buttonIcon,
  sectionImage,
  background,
  sectionAlt = "section-image",
  reverse = false,
}) => {
  const layoutClasses = reverse
    ? "md:flex-row-reverse md:gap-[min(13.25vw,250px)]"
    : "md:flex-row md:gap-[min(13.25vw,250px)]";

  return (
    <div
      style={{ backgroundColor: background }}
      className={`w-full h-full flex justify-center items-center `}
    >
      <div
        className={`w-full h-full py-[15%] md:py-[7.5%] max-w-[90%] md:max-w-[85%] flex flex-col ${layoutClasses} justify-between items-center`}
      >
        {/* Text Section */}
        <div className="w-full max-w-fit flex flex-col justify-start items-start font-sans gap-[min(5.15vw,20px)] md:gap-[min(1.305vw,25px)]">
          <div className="bg-primary bg-opacity-15 w-fit py-[min(2.05vw,8px)] md:py-[min(0.425vw,8px)] px-[min(2.55vw,10px)] md:px-[min(0.525vw,10px)] rounded-[min(2.55vw,10px)] md:rounded-[min(0.525vw,10px)] text-[min(3.585vw,14px)] md:text-[min(0.835vw,10px)] font-bold text-primary uppercase">
            {title}
          </div>
          <div
            className={`w-[90%] font-gilroy font-bold text-[min(7.165vw,28px)] md:text-[min(2.0835vw,40px)] ${reverse ? "text-primary" : "text-black"} `}
          >
            {text}{" "}
            <span className={` ${reverse ? "text-black" : "text-primary"}`}>
              {highlightedText}
            </span>
          </div>
          {/* Image for Mobile */}
          <Image
            alt={sectionAlt}
            src={sectionImage}
            className="py-[min(3.065vw,12px)] md:hidden flex w-full"
          />
          <div className="w-[90%] text-[#2D2D2D] font-normal text-[min(3.585vw,14px)] md:text-[min(1.095vw,21px)]">
            {description}
          </div>
          <div className="text-primary font-semibold text-[min(4.095vw,16px)] md:text-[min(1.145vw,22px)] flex pt-[min(0.785vw,15px)] cursor-pointer">
            {buttonText}
            <Image
              alt="button-icon"
              src={buttonIcon}
              className="ml-[min(6.395vw,25px)] md:ml-[min(1.305vw,25px)] w-[min(2.175vw,8.5px)] md:w-[min(0.445vw,8.5px)]"
            />
          </div>
        </div>
        {/* Image for Desktop */}
        <Image
          alt={sectionAlt}
          src={sectionImage}
          className="hidden md:flex md:w-[min(37.75vw,725px)]"
        />
      </div>
    </div>
  );
};

export default ContentLayout;
