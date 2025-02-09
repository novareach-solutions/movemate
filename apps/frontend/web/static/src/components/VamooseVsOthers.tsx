import React from "react";
// import percentage from "../../public/icons/percentage.svg";
// import Image from "next/image";

const VamooseVsOthers: React.FC = () => {
  const featuresCard = [
    {
      feature: "Hybrid Earning Model",
      vamosseFeature:
        "Keep 100% of earnings or a low-commission-per-ride model.",
      othersFeature: "Flat commission charged per ride.",
    },
    {
      feature: "Transparent Pricing",
      vamosseFeature: "Letting drivers earn & save more",
      othersFeature: "Up to 25-30% commission cuts",
    },
    {
      feature: "Your Voice, Your Platform",
      vamosseFeature: "Options tailored to your needs",
      othersFeature: "No timely help offered to riders",
    },
    {
      feature: "Your Voice, Your PlatformFeature 4",
      vamosseFeature:
        "Earn extra with surge, nightly rates, & holiday bonuses.",
      othersFeature: "No such benefits",
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#F8F5FB] md:bg-white">
      <div className="w-full h-full py-[7.5%] md:py-[3.75%] max-w-[90%] md:max-w-[85%] flex flex-col items-center text-center gap-[min(8.185vw,32px)] md:gap-[min(1.45vw,28px)]">
        {/* Header Section */}
        <div className="hidden md:block bg-primary bg-opacity-15 py-[min(2.05vw,8px)] md:py-[min(0.425vw,8px)] px-[min(2.55vw,10px)] md:px-[min(0.525vw,10px)] rounded-[min(2.55vw,10px)] md:rounded-[min(0.525vw,10px)] text-[min(3.585vw,14px)] md:text-[min(0.835vw,10px)] font-bold text-primary uppercase">
          Setting Apart
        </div>
        <div className="font-gilroy font-bold text-[min(8.185vw,32px)] md:text-[min(1.825vw,35px)] text-primary">
          Vamoose vs. Others:
          <span className="text-black"> What Sets Us Apart</span>
        </div>

        <div className="w-full flex flex-col gap-[min(4.095vw,16px)] md:hidden ">
          {featuresCard.map((item, index) => (
            <div
              key={index}
              className=" font-sans bg-white p-[min(4.095vw,16px)] flex flex-col items-start gap-[min(4.095vw,16px)] border border-primary rounded-[min(2.55vw,10px)] "
            >
              <div className="  font-semibold text-[min(4.095vw,16px)] text-[#2D2D2D] ">
                {item.feature}
              </div>
              <div className=" gap-[min(2.045vw,8px)] flex flex-col items-start ">
                <div className=" gap-[min(1.025vw,4px)] flex flex-col items-start  ">
                  <div className=" text-[min(4.095vw,16px)] text-primary font-semibold ">
                    Vamoose
                  </div>
                  <div className=" font-normal text-[min(3.065vw,12px)]  ">
                    {item.vamosseFeature}
                  </div>
                </div>
                <div className=" gap-[min(1.025vw,4px)] flex flex-col items-start  ">
                  <div className=" text-[min(4.095vw,16px)] text-[#1D1D1D] font-medium ">
                    Others
                  </div>
                  <div className=" font-normal text-[min(3.065vw,12px)]  ">
                    {item.othersFeature}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Download App */}
        <button className=" md:hidden mt-[min(6.135vw,24px)] mb-[min(3.065vw,12px)] rounded-[min(1.275vw,5px)] bg-primary font-sans text-[min(3.065vw,12px)] font-bold text-white py-[min(3.065vw,12px)] px-[min(7.165vw,28px)]  ">
          Download App
        </button>
      </div>
    </div>
  );
};

export default VamooseVsOthers;
