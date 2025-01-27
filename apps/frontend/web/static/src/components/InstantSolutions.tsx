import Image from "next/image";
import allsolutions from "../../public/icons/allsolutions.svg";
import seamless from "../../public/icons/seamless.svg";
import anytime from "../../public/icons/anytime.svg";

const InstantSolutions = () => {
  const features = [
    {
      imageSrc: allsolutions,
      imageAlt: "allsolutions",
      title: "All-in-One Solution",
      description:
        "From forgotten items to car towing, Vamoose is your go-to app for every situation.",
    },
    {
      imageSrc: seamless,
      imageAlt: "seamless",
      title: "Seamless Experience",
      description:
        "Enjoy lightning-fast deliveries, seamless rides, and real-time tracking at your fingertips.",
    },
    {
      imageSrc: anytime,
      imageAlt: "anytime",
      title: "Anytime, Anywhere",
      description:
        "Count on Vamoose to simplify your life, no matter the hour or location.",
    },
  ];

  return (
    <div
      style={{ backgroundColor: "#F8F5FB" }}
      className={`w-full h-full flex justify-center items-center `}
    >
      <div
        className={`w-full h-full py-[15%] md:py-[7.5%] max-w-[90%] md:max-w-[85%] flex flex-col md:flex-row gap-[min(10.4235vw,40px)] md:gap-[min(26.045vw,500px)] justify-between items-start`}
      >
        {/* Text Section */}
        <div className="w-full max-w-fit flex flex-col justify-start items-start font-sans gap-[min(5.15vw,20px)] md:gap-[min(1.305vw,25px)]">
          <div className="bg-primary bg-opacity-15 w-fit py-[min(2.05vw,8px)] md:py-[min(0.425vw,8px)] px-[min(2.55vw,10px)] md:px-[min(0.525vw,10px)] rounded-[min(2.55vw,10px)] md:rounded-[min(0.525vw,10px)] text-[min(3.585vw,14px)] md:text-[min(0.835vw,10px)] font-bold text-primary uppercase">
            Instant Solutions
          </div>
          <div
            className={`w-[90%] font-gilroy font-bold text-[min(7.165vw,28px)] md:text-[min(2.0835vw,40px)] text-black `}
          >
            Life&apos;s Solutions,
            <span className={` text-primary`}> One Tap Away</span>
          </div>
          <div className="w-[90%] text-[#2D2D2D] font-normal text-[min(3.585vw,14px)] md:text-[min(1.095vw,21px)]">
            Deliveries, rides, and more - fast, seamless, and personalized
          </div>
        </div>

        <div className=" flex w-full md:w-[65%] flex-col gap-[min(10.235vw,40px)] md:gap-[min(3.905vw,75px)] justify-center items-start  ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start justify-start gap-[min(4.095vw,16px)] md:gap-[min(1.565vw,30px)] "
            >
              <Image
                src={feature.imageSrc}
                alt={feature.imageAlt}
                className=" w-[min(19.435vw,76px)] md:w-[min(3.125vw,60px)] "
              />
              <div className="flex flex-col items-start justify-start gap-[min(2.045vw,8px)] md:gap-[min(0.415vw,8px)] font-sans">
                <div className=" font-bold text-[min(4.095vw,16px)] md:text-[min(1.45vw,28px)] ">
                  {feature.title}
                </div>
                <div className=" text-[#2D2D2D] font-medium text-[min(3.585vw,14px)] md:text-[min(0.9375vw,18px)] ">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstantSolutions;
