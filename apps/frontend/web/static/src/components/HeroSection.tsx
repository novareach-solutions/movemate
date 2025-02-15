import {
  DottedPatternSvg,
  PurpleCircleSvg,
} from "../../public/svgs/decorative-svgs";
import Image from "next/image";

// Service card data type
interface ServiceCardProps {
  title: string;
  image: string;
  width: number;
  height: number;
}

// Service data
const services: ServiceCardProps[] = [
  {
    title: "On-Demand Delivery",
    image: "/images/ond.png",
    width: 81,
    height: 69,
  },
  {
    title: "Car Towing",
    image: "/images/ct.png",
    width: 124,
    height: 41,
  },
  {
    title: "Buy from a Store",
    image: "/images/buy.png",
    width: 88,
    height: 85,
  },
  {
    title: "House Moving",
    image: "/images/houseMoving.png",
    width: 99,
    height: 99,
  },
];

export default function HeroSection() {
  return (
    <section className="relative  py-12 lg:px-[100px] px-4 bg-transparent">
      <DottedPatternSvg className="absolute  top-0  hidden md:block left-0 z-[1]" />
      <DottedPatternSvg className="absolute bottom-0  hidden md:block right-0 z-[1] rotate-180" />
      {/* <PurpleCircleSvg className="absolute top-[-150px] hidden md:block right-[-200px] z-[1] w-[1000px] h-auto" /> */}

      <div className="relative z-[2] mx-auto flex   flex-wrap items-center justify-between gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="mb-2 text-3xl md:text-4xl font-bold leading-snug">
            <span className="font-medium"> Your </span>
            <span className="text-white bg-[#8123AD]">Personal Taskforce</span>,
            <br />
            Anytime. <br /> Anywhere! <span className="text-2xl">✨</span>
          </h1>

          <div className="border mt-[35px] border-[#8123AD45] border-opacity-[27%] rounded-[20px] max-w-[458px]">
            <h2 className="flex items-center mt-[30px] mb-[30px] justify-center lg:text-[20px] font-semibold">
              What <span className="mx-1 text-[#8123AD]">service</span>
              are you looking for today?
            </h2>
            <div className="grid grid-cols-2 gap-4 p-4">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Image - Hidden on mobile, visible on medium screens and above */}
        <div className="hidden md:block relative  min-w-[300px]">
          <Image
            src="/images/herosection.png"
            alt="Hero Section"
            width={600} // Adjust width as needed
            height={400} // Adjust height as needed
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// Service card component
function ServiceCard({ title, image, width, height }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center p-4 text-center">
      <div className="h-[122px] flex items-center justify-center bg-[#D4D4D43B] rounded-[10px] w-[170px]">
        <Image src={image} alt={title} width={width} height={height} />
      </div>
      <p className="mt-2 text-[18px] font-semibold">{title}</p>
    </div>
  );
}
