import { useRouter } from "next/router";
import React from "react";
import ServicesHerosection from "@/components/ServicesHerosection";
import ThreeStepsSection from "@/components/ThreeStepsSection";
import WhyVamoose from "@/components/WhyVamoose";
import { Truck, Clock, Shield, Package, Mail } from "lucide-react";
import step1 from "../../../public/images/step1.png";
import step2 from "../../../public/images/step2.png";
import Dme from "../../../public/images/Dme.png";
import service1 from "../../../public/images/service1.png";
import service2 from "../../../public/images/service2.png";
import service32 from "../../../public/images/service32.png";

import { StaticImageData } from "next/image";
import { GetnotifiedSvg } from "../../../public/svgs/GetnotifiedSvg";

interface ServiceConfig {
  hero: {
    image: StaticImageData;
    headingPart1: string;
    headingPart2: string;
    description: string;
    buttonText?: string;
  };
  hasSteps?: boolean;
  steps?: {
    number: string;
    title: string;
    description: string;
    image: StaticImageData;
  }[];
  whySection?: {
    mainHeading: string;
    highlight: string;
    firstRowCards: {
      icon: React.ReactNode;
      heading: string;
      description: string;
      bgColor?: string;
    }[];
    secondRowFirstCard: {
      icon: React.ReactNode;
      heading: string;
      description: string;
      bgColor?: string;
    };
    twoColumnCard: {
      heading: string;
      description: string;
      buttonText: string;
      image: StaticImageData;
      bgColor?: string;
    };
  };
}

// ============================
// Custom Car Towing Hero Content
// ============================
const CarTowingHeroContent: React.FC = () => {
  const [email, setEmail] = React.useState("");

  return (
    <div className="flex flex-col gap-4">
      <GetnotifiedSvg />
      <h1 className="text-3xl font-bold text-purple-600">Get Notified</h1>
      <p className="text-lg font-semibold">when we launch</p>
      <p className="text-gray-700 max-w-md">
        With Vamoose’s reliable car towing service, help is always on the way.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2 mb-2 px-4 py-2 w-full max-w-sm border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
      />

      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 w-fit">
        Get Notified
      </button>
      <small className="text-gray-500">
        Don’t Worry! We will not spam you.
      </small>
    </div>
  );
};

// ============================
// Service Config
// ============================
const serviceConfigs: Record<string, ServiceConfig> = {
  "on-demand-delivery": {
    hero: {
      image: service1,
      headingPart1: "Fast, Reliable Delivery Right",
      headingPart2: "at Your Fingertips!",
      description:
        "Make Vamoose your trusted choice for fast, reliable delivery services...",
      buttonText: "Get Started",
    },
    hasSteps: true,
    steps: [
      {
        number: "01",
        title: "Select Your Service",
        description:
          "Choose from our range of delivery options tailored to your needs.",
        image: step1,
      },
      {
        number: "02",
        title: "Customize Your Order",
        description: "Provide details and special instructions.",
        image: step2,
      },
      {
        number: "03",
        title: "Confirm & Track",
        description:
          "Review your order details and track your package in real-time.",
        image: step1,
      },
    ],
    whySection: {
      mainHeading: "When",
      highlight: "Vamoose?",
      firstRowCards: [
        {
          icon: <Truck className="w-8 h-8 text-purple-600" />,
          heading: "Fast Delivery",
          description: "Next-day delivery options across major cities",
        },
        {
          icon: <Clock className="w-8 h-8 text-purple-600" />,
          heading: "Real-time Tracking",
          description: "Live package tracking from pickup to delivery",
        },
        {
          icon: <Shield className="w-8 h-8 text-purple-600" />,
          heading: "Secure Handling",
          description: "Fully insured and protected packages",
        },
      ],
      secondRowFirstCard: {
        icon: <Package className="w-8 h-8 text-purple-600" />,
        heading: "Custom Packaging",
        description: "We provide specialized packaging for fragile items",
      },
      twoColumnCard: {
        heading: "Start Shipping Today",
        description: "Join thousands of satisfied customers using our platform",
        buttonText: "Get Started Now",
        image: Dme,
        bgColor: "bg-gradient-to-b from-[#A54FCE] to-[#572C6C]",
      },
    },
  },

  "car-towing": {
    // We'll only use the image from config.hero
    // We won't pass heading/description/button text
    hero: {
      image: service2,
      headingPart1: "",
      headingPart2: "",
      description: "",
      buttonText: "",
    },
    // No steps for car towing, so we omit that
    whySection: {
      mainHeading: "Why Choose Our",
      highlight: "Towing Service",
      firstRowCards: [
        {
          icon: <Clock className="w-8 h-8 text-purple-600" />,
          heading: "24/7 Service",
          description: "Round-the-clock emergency towing assistance",
        },
        {
          icon: <Shield className="w-8 h-8 text-purple-600" />,
          heading: "Licensed Experts",
          description: "Professional and certified towing operators",
        },
        {
          icon: <Truck className="w-8 h-8 text-purple-600" />,
          heading: "Quick Response",
          description: "Fast arrival times for emergency situations",
        },
      ],
      secondRowFirstCard: {
        icon: <Mail className="w-8 h-8 text-purple-600" />,
        heading: "Stay Updated",
        description: "Get notifications about service availability",
      },
      twoColumnCard: {
        heading: "Join Our Waitlist",
        description: "Be the first to know when we launch in your area",
        buttonText: "Subscribe Now",
        image: Dme,
        bgColor: "bg-gradient-to-b from-[#398DF2] to-[#0B3A74]",
      },
    },
  },

  "buy-store": {
    hero: {
      image: service32,
      headingPart1: "Shop & Ship",
      headingPart2: "with Confidence",
      description:
        "Purchase from your favorite stores and let us handle the delivery!",
      buttonText: "Start Shopping",
    },
    hasSteps: true,
    steps: [
      {
        number: "01",
        title: "Browse & Select",
        description: "Browse partner stores and select your items",
        image: step1,
      },
      {
        number: "02",
        title: "Place Your Order",
        description: "Complete your purchase and provide delivery details",
        image: step2,
      },
      {
        number: "03",
        title: "Track & Receive",
        description: "Track your order and receive it at your doorstep",
        image: step1,
      },
    ],
    whySection: {
      mainHeading: "Why Shop with",
      highlight: "Vamoose",
      firstRowCards: [
        {
          icon: <Package className="w-8 h-8 text-purple-600" />,
          heading: "Secure Shopping",
          description: "Safe and secure payment processing",
        },
        {
          icon: <Truck className="w-8 h-8 text-purple-600" />,
          heading: "Fast Shipping",
          description: "Quick delivery of your purchases",
        },
        {
          icon: <Shield className="w-8 h-8 text-purple-600" />,
          heading: "Buyer Protection",
          description: "Full protection on all purchases",
        },
      ],
      secondRowFirstCard: {
        icon: <Clock className="w-8 h-8 text-purple-600" />,
        heading: "24/7 Support",
        description: "Round-the-clock customer service assistance",
      },
      twoColumnCard: {
        heading: "Start Shopping Now",
        description: "Access thousands of products from top retailers",
        buttonText: "Explore Stores",
        image: Dme,
        bgColor: "bg-gradient-to-b from-[#31BFA6] to-[#176154]",
      },
    },
  },
};

const ServicePage: React.FC = () => {
  const router = useRouter();
  const { serviceType } = router.query;

  // Handle loading state or invalid param
  if (!serviceType || typeof serviceType !== "string") {
    return <div>Loading...</div>;
  }

  const config = serviceConfigs[serviceType];
  if (!config) {
    return <div>Service not found</div>;
  }

  // Decide if it's car towing
  const isCarTowing = serviceType === "car-towing";

  return (
    <>
      {/* For car-towing, pass ONLY the image + custom children */}
      {isCarTowing ? (
        <ServicesHerosection image={config.hero.image}>
          <CarTowingHeroContent />
        </ServicesHerosection>
      ) : (
        // For all others, pass the full hero props
        <ServicesHerosection {...config.hero} />
      )}

      {/* If there are steps, render them */}
      {config.hasSteps && config.steps && (
        <ThreeStepsSection
          mainHeadingPart1="How to Get"
          mainHeadingPart2="Started with Your Order"
          steps={config.steps}
        />
      )}

      {/* Why Vamoose */}
      {config.whySection && (
        <WhyVamoose
          mainHeading={config.whySection.mainHeading}
          highlight={config.whySection.highlight}
          firstRowCards={config.whySection.firstRowCards}
          secondRowFirstCard={config.whySection.secondRowFirstCard}
          secondRowCard={config.whySection.twoColumnCard}
          firstRowBg="bg-gray-50"
          secondRowFirstBg="bg-white"
        />
      )}
    </>
  );
};

export default ServicePage;
