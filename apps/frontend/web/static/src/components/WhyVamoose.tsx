import Image, { StaticImageData } from "next/image";
import React from "react";

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
    <div className={`${bgColor} p-8 rounded-xl shadow-lg h-full flex flex-col`}>
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
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
            className={`md:col-span-2 ${secondRowCard.bgColor} p-8 rounded-xl shadow-lg h-full`}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 h-full">
              {/* Text Content */}
              <div className="md:w-1/2 flex flex-col items-start gap-4 h-full justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {secondRowCard.heading}
                  </h3>
                  <p className="text-gray-600 mt-4">
                    {secondRowCard.description}
                  </p>
                </div>
                <button
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg 
                  hover:bg-purple-700 transition-colors duration-300 mt-4"
                >
                  {secondRowCard.buttonText}
                </button>
              </div>

              {/* Image */}
              <div className="md:w-1/2 relative h-64 md:h-full w-full">
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
