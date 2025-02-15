import Image, { StaticImageData } from "next/image";
import React from "react";
import playStore from "../../public/icons/googlePlay.svg";
import appStore from "../../public/icons/appStore.svg";
interface SimpleCard {
  icon: React.ReactNode;
  heading: string;
  description: string;
  bgColor?: string;
}

interface TwoColumnCard {
  heading: string;
  description: string;
  buttonText: string;
  image: StaticImageData;
  bgColor?: string;
}

interface WhyVamooseProps {
  mainHeading: string;
  highlight: string;
  firstRowCards: SimpleCard[];
  secondRowFirstCard: SimpleCard; // New prop for second row's first card
  secondRowCard: TwoColumnCard;
  firstRowBg?: string;
  secondRowFirstBg?: string;
}

const WhyVamoose: React.FC<WhyVamooseProps> = ({
  mainHeading = "Why Choose",
  highlight = "Vamoose",
  firstRowCards,
  secondRowFirstCard, // New prop
  secondRowCard,
  firstRowBg = "bg-white",
  secondRowFirstBg = "bg-gray-100",
}) => {
  const SimpleCard = ({ icon, heading, description, bgColor }: SimpleCard) => (
    <div
      className={`${bgColor} p-8 rounded-xl shadow-lg shadow-purple-100 h-full flex flex-col`}
    >
      <div className="flex flex-col items-start gap-4 flex-grow">
        <div className="p-4 rounded-lg bg-purple-100">{icon}</div>
        <h3 className="text-2xl font-bold">{heading}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
      </div>
    </div>
  );

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 py-16">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12">
          {mainHeading} <span className="text-purple-600">{highlight}</span>
        </h2>

        {/* Unified Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Row - 3 Cards */}
          {firstRowCards.map((card, index) => (
            <SimpleCard
              key={index}
              icon={card.icon}
              heading={card.heading}
              description={card.description}
              bgColor={card.bgColor}
            />
          ))}

          {/* Second Row - First Card */}
          <div className="h-full">
            <SimpleCard
              icon={secondRowFirstCard.icon}
              heading={secondRowFirstCard.heading}
              description={secondRowFirstCard.description}
              bgColor={secondRowFirstBg}
            />
          </div>

          {/* Second Row - Two Column Card */}
          <div
            className={`md:col-span-2 ${secondRowCard.bgColor} px-8 pt-8 rounded-xl shadow-lg shadow-purple-100 h-full`}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 h-full">
              {/* Text Content */}
              <div className="md:w-1/2 flex flex-col items-start gap-4 h-full ">
                <div>
                  <h3 className="text-2xl font-bold">
                    {secondRowCard.heading}
                  </h3>
                  <p className="text-gray-600 mt-4">
                    {secondRowCard.description}
                  </p>
                </div>
                <div className=" pt-[min(2.05vw,8px)] md:pt-[min(2.705vw,52px)] flex gap-[min(3.325vw,13px)] md:gap-[min(2.085vw,40px)] ">
                  <Image
                    src={playStore}
                    alt={"button"}
                    className={
                      "w-[min(15.345vw,60px)] md:w-[min(8.85vw,170px)]"
                    }
                  />
                  <Image
                    src={appStore}
                    alt={"button"}
                    className={
                      "w-[min(15.345vw,60px)] md:w-[min(8.85vw,170px)]"
                    }
                  />
                </div>
              </div>

              {/* Image */}
              <div className="md:w-[259px] relative h-64 md:h-[271px] overflow-hidden w-full">
                <Image
                  src={secondRowCard.image}
                  alt="Feature image"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVamoose;
