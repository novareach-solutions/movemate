import React from "react";

// Define the Feature interface for type safety
interface Feature {
  icon: string;
  text: string;
}

const ComparisonCards: React.FC = () => {
  // Features for Vamoose Main section
  const vamooseFeaturesMain: Feature[] = [
    {
      icon: "/images/Hem.png",
      text: "Hybrid Earning Model",
    },
    {
      icon: "/images/Discount.png",
      text: "Transparent Pricing",
    },
    {
      icon: "/images/Hem.png",
      text: "Hybrid Earning Model",
    },
    {
      icon: "/images/Discount.png",
      text: "Transparent Pricing",
    },
  ];

  // Specific features for Vamoose
  const vamooseFeatures: string[] = [
    "Keep 100% of earnings or a low-commission-per-ride model.",
    "Letting drivers earn and save more.",
    "Keep 100% of earnings or a low-commission-per-ride model.",
    "Letting drivers earn and save more.",
  ];

  // Features for competitors ("Others")
  const othersFeatures: string[] = [
    "Flat commission charged per ride.",
    "Up to 25%-30% commission cuts",
    "Flat commission charged per ride.",
    "Up to 25%-30% commission cuts",
  ];

  return (
    <div className="min-h-screen md:flex sm:hidden bg-white p-8 md:p-12">
      {/* Header Section */}
      <div className="mb-12 sm:hidden flex justify-center items-center flex-col text-center">
        {/* Tagline */}
        <div className="md:flex justify-center items-center bg-primary bg-opacity-15 py-[min(2.05vw,8px)] md:py-[min(0.425vw,8px)] px-[min(2.55vw,10px)] md:px-[min(0.525vw,10px)] rounded-[min(2.55vw,10px)] md:rounded-[min(0.525vw,10px)] text-[min(3.585vw,14px)] w-[143px] md:text-[min(0.835vw,10px)] font-bold text-primary uppercase">
          Setting Apart
        </div>
        {/* Title */}
        <div className="font-gilroy font-bold text-[min(8.185vw,32px)] md:text-[min(1.825vw,35px)] text-primary">
          Vamoose vs. Others:
          <span className="text-black"> What Sets Us Apart</span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row justify-center max-w-[1620px] mx-auto">
        {/* Vamoose Features Card */}
        <div className="w-[565px] h-[603px] bg-[#F8F5FB] rounded-l-[19px] p-8 pl-[87px] pr-[135px]">
          <ul className="space-y-[78px] mt-[96px]">
            {vamooseFeaturesMain.map((feature, index) => (
              <li
                key={index}
                className="flex items-start text-gray-700 font-semibold font-gilroy text-[24px]"
              >
                {/* Feature Icon */}
                <img
                  src={feature.icon}
                  alt="Feature Icon"
                  className="w-6 h-6 mr-3"
                />
                {/* Feature Text */}
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vamoose Highlight Card */}
        <div className="w-[490px] h-[703px] bg-gradient-to-bl from-purple-400 to-[#681F8B] text-center rounded-[25px] px-[75px] py-[40px] transform -translate-y-12">
          {/* Card Title */}
          <h3 className="text-[25px] font-bold font-gilroy text-white mb-[58px]">
            Vamoose
          </h3>
          {/* Vamoose Specific Features */}
          <ul className="space-y-[50px] text-white text-[21px]">
            {vamooseFeatures.map((feature, index) => (
              <li
                key={index}
                className="hover:translate-x-2 transition-transform"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Competitors ("Others") Features Card */}
        <div className="w-[565px] h-[603px] bg-[#F8F5FB] rounded-r-[19px] p-8 pl-[135px]">
          {/* Card Title */}
          <h3 className="text-[25px] font-gilroy font-bold text-gray-800 mb-8">
            Others
          </h3>
          {/* Competitors Features */}
          <ul className="space-y-[90px] text-[21px]">
            {othersFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCards;
