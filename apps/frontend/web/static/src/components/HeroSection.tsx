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

// Image container props type
interface ImageContainerProps {
  src: string;
  alt: string;
  label?: string;
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

// Collage images data
const collageImages: ImageContainerProps[] = [
  { src: "/images/hero1.png", alt: "Car Towing" },
  { src: "/images/hero1.png", alt: "Workers carrying boxes" },
  { src: "/images/hero2.png", alt: "Person carrying a box" },
  {
    src: "/images/hero3.png",
    alt: "Man loading boxes",
    label: "Order Picked Up",
  },
];

export default function HeroSection() {
  return (
    <section className="relative py-12 px-4 bg-transparent">
      <DottedPatternSvg className="absolute top-0 left-0 z-[1]" />
      <DottedPatternSvg className="absolute bottom-0 right-0 z-[1] rotate-180" />
      <PurpleCircleSvg className="absolute top-[-150px] right-[-200px] z-[1] w-[1000px] h-auto" />

      <div className="relative z-[2] mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="mb-2 text-3xl md:text-4xl font-bold leading-snug">
            <span className="font-medium"> Your </span>
            <span className="text-white bg-[#8123AD]">Personal Taskforce</span>,
            <br />
            Anytime. <br /> Anywhere! <span className="text-2xl">✨</span>
          </h1>

          <div className="border mt-[35px] border-[#8123AD45] border-opacity-[27%] rounded-[20px] max-w-[458px]">
            <h2 className="flex items-center mt-[30px] mb-[30px] justify-center text-[20px] font-semibold">
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

        {/* Right Image Collage */}
        <div className="relative grid flex-1 min-w-[300px] grid-cols-2 gap-4">
          {collageImages.map((image, index) => (
            <ImageContainer key={index} {...image} />
          ))}
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

// Image container component
function ImageContainer({ src, alt, label }: ImageContainerProps) {
  return (
    <div className="relative w-full h-40">
      <Image src={src} alt={alt} fill className="rounded-lg object-cover" />
      {label && (
        <div className="absolute bottom-[-1.25rem] left-5 rounded-md bg-white px-3 py-1 text-sm shadow-md">
          {label}
        </div>
      )}
    </div>
  );
}
