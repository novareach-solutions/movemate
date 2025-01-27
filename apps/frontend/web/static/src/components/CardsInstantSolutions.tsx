import Image from "next/image";
import React from "react";
import card1 from "../../public/images/card1.png";
import card2 from "../../public/images/card2.png";
import card3 from "../../public/images/card3.png";

const cardsData = [
  {
    cardColor: "#1785FF",
    image: card1,
    title: "Forgot something at home ?",
    description: "Get it delivered anytime, anywhere!!",
  },
  {
    cardColor: "#1CA672",
    image: card2,
    title: "Need instant home supplies ?",
    description: "Get it delivered anytime, anywhere!!",
  },
  {
    cardColor: "#9881D3",
    image: card3,
    title: "Car gave hand in the middle of ?",
    description: "Get it delivered anytime, anywhere!!",
  },
];

const CardsInstantSolutions: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      <div className="w-full h-full py-[7.5%] md:py-[3.75%] max-w-[90%] md:max-w-[85%] flex flex-col items-start gap-[min(6.395vw,25px)] md:gap-[min(4.425vw,85px)] font-sans">
        {/* Header */}
        <div className="w-full flex flex-col items-start font-sans gap-[min(5.15vw,20px)] md:gap-[min(1.305vw,25px)]">
          <div className="bg-primary bg-opacity-15 py-[min(2.05vw,8px)] md:py-[min(0.425vw,8px)] px-[min(2.55vw,10px)] md:px-[min(0.525vw,10px)] rounded-[min(2.55vw,10px)] md:rounded-[min(0.525vw,10px)] text-[min(3.585vw,14px)] md:text-[min(0.835vw,10px)] font-bold text-primary uppercase">
            Instant Solutions
          </div>
          <div className="w-[90%] font-gilroy font-bold text-[min(7.165vw,28px)] md:text-[min(2.0835vw,40px)]">
            Everyday Solutions,
            <span className="text-primary"> Anytime You Need!</span>
          </div>
        </div>
        {/* Card container */}
        <div className="w-full  overflow-x-auto scrollbar-hide md:overflow-x-hidden">
          <div className=" justify-start items-center gap-[min(4.095vw,16px)] md:gap-[min(4.53vw,87px)] inline-flex">
            {cardsData.map((card, index) => (
              <div
                key={index}
                style={{ backgroundColor: card.cardColor }}
                className={` z-[0] text-white flex flex-wrap flex-col items-start justify-center gap-[min(4.095vw,5px)] md:gap-[min(1.565vw,15px)] rounded-[min(2.625vw,10.25px)] md:rounded-[min(0.985vw,19px)] pl-[min(4.095vw,16px)] md:pl-[min(1.045vw,20px)] py-[min(4.095vw,16px)] md:py-[min(2.605vw,50px)] w-[min(66.495vw,260px)] md:w-[min(25vw,480px)] relative overflow-hidden`}
              >
                <h3 className="z-[2] w-[60%] font-gilroy font-bold text-[min(4.095vw,16px)] md:text-[min(1.25vw,24px)]">
                  {card.title}
                </h3>
                <p className="z-[2] w-[60%] md:w-[90%] font-semibold text-[min(2.55vw,10px)] md:text-[min(0.785vw,15px)]">
                  {card.description}
                </p>
                <div
                  style={{ color: card.cardColor }}
                  className={`z-[2] bg-white font-bold text-[min(1.91vw,7.5px)] md:text-[min(0.729vw,14px)] items-center flex p-[min(1.405vw,5.5px)] md:p-[min(0.525vw,10px)] mt-[min(2.55vw,10px)] md:mt-[min(0.525vw,10px)] rounded-[min(1.15vw,4.5px)] md:rounded-[min(0.415vw,8px)] cursor-pointer`}
                >
                  Vamoose it!
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="ml-[min(1.025vw,4px)] md:ml-[min(0.415vw,8px)] w-[min(1.915vw,7.5px)] md:w-[min(0.729vw,14px)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.1875 7H11.8125"
                      stroke={card.cardColor}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.875 3.0625L11.8125 7L7.875 10.9375"
                      stroke={card.cardColor}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Image
                  src={card.image}
                  alt={card.title}
                  className={`absolute w-[min(34.525vw,135px)] md:w-[min(13.545vw,260px)] top-0 right-0 z-[1]`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsInstantSolutions;
