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
  tabs: TabContent[];
}

export const SignupEssentials = ({ title, tabs }: SignupEssentialsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-8">
          {title.split(" ").map((word, index) => (
            <span
              key={index}
              className={
                index === 1 ? "bg-purple-100 text-purple-600 px-2" : ""
              }
            >
              {word}{" "}
            </span>
          ))}
        </h2>

        <div className="border rounded-full p-2 mb-12 max-w-2xl mx-auto">
          <div className="flex justify-between">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-8 py-3 rounded-full ${
                  activeTab === index ? "bg-purple-600 text-white" : ""
                }`}
              >
                {tab.tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tabs[activeTab].cards.map((card, index) => (
            <div key={index} className="p-6 border rounded-xl h-96">
              <img
                src={card.icon}
                alt={card.title}
                className="h-12 w-12 mb-4"
              />
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <ul className="space-y-2">
                {card.points.map((point, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
