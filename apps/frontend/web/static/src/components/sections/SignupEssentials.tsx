import Image from "next/image";
import { useState } from "react";

interface TabContent {
  tab: string;
  cards: {
    icon: string;
    title: string;
    points: string[];
  }[];
}

interface SignupEssentialsProps {
  title: string;
  subtitle: string;
  tabs: TabContent[];
}

export const SignupEssentials = ({
  title,
  subtitle,
  tabs,
}: SignupEssentialsProps) => {
  // State for desktop tabs
  const [activeTab, setActiveTab] = useState(0);
  // State for mobile accordion (null means all closed)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  return (
    <section className="py-10 sm:py-20 bg-[#F8F5FB]">
      <div className="w-full flex flex-col justify-between items-center px-4 sm:px-0">
        {/* Common Header */}
        <p className="text-[16px] mb-4 sm:mb-[36px] font-bold">
          <span className="bg-purple-100 text-purple-600 rounded-[10px] px-2 py-1">
            {subtitle}
          </span>
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-8">
          {title.split(" ").map((word, index) => (
            <span key={index} className={index > 4 ? "text-purple-600" : ""}>
              {word}{" "}
            </span>
          ))}
        </h2>

        {/* Desktop Tab View */}
        <div className="hidden md:flex flex-col justify-center items-center px-[150px] w-full mb-12">
          {/* Tab Buttons */}
          <div className="border border-[#8123AD] w-[748px] rounded-full p-2 mb-8">
            <div className="flex justify-between">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-8 py-3 font-gilroy rounded-full ${
                    activeTab === index
                      ? "bg-[#8123AD] bg-opacity-80 text-white font-semibold"
                      : "text-[#777777] font-medium"
                  }`}
                >
                  {tab.tab}
                </button>
              ))}
            </div>
          </div>
          {/* Tab Cards Grid */}
          <div className="grid md:flex gap-8">
            {tabs[activeTab].cards.map((card, index) => (
              <div
                key={index}
                className="p-6 w-full  bg-white rounded-[30px] h-auto md:h-[564px]"
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={48}
                  height={48}
                  className="h-12 w-12 mb-4"
                />
                <h3 className="text-[25px] font-semibold mb-4 font-gilroy">
                  {card.title}
                </h3>
                <ul className="space-y-4 text-xl font-gilroy font-medium text-[#4F6672]">
                  {card.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="block md:hidden w-full">
          {tabs.map((tab, index) => (
            <div key={index} className="mb-4 border rounded-lg bg-white">
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === index ? null : index)
                }
                className="w-full text-left px-4 py-3 font-bold text-[#8123AD]"
              >
                {tab.tab}
              </button>
              {activeAccordion === index && (
                <div className="px-4 py-3">
                  {tab.cards.map((card, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="mb-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center mb-2">
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={48}
                          height={48}
                          className="h-12 w-12 mr-4"
                        />
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                      </div>
                      <ul className="list-disc pl-6 text-sm text-[#4F6672]">
                        {card.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
