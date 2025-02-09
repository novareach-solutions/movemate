// pages/services/[serviceType].tsx
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

// Service type configuration
interface ServiceConfig {
  hero: {
    image: StaticImageData;
    headingPart1: string;
    headingPart2: string;
    description: string;
    buttonText: string;
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

// Email notification component for car towing
const EmailNotification: React.FC = () => {
  const [email, setEmail] = React.useState("");

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
        />
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-lg 
          hover:bg-purple-700 transition-colors duration-300"
        >
          Get Notified
        </button>
      </div>
    </div>
  );
};

// Service configurations
const serviceConfigs: Record<string, ServiceConfig> = {
  "on-demand-delivery": {
    hero: {
      image: service1,
      headingPart1: "Fast, Reliable Delivery Right",
      headingPart2: "at Your Fingertips!",
      description:
        "Make Vamoose your trusted choice for fast, reliable, and hassle-free delivery services tailored to meet your needs effortlessly!",
      buttonText: "Get Started",
    },
    hasSteps: true,
    steps: [
      {
        number: "01",
        title: "Select Your Service",
        description:
          "Choose from our range of delivery options tailored to your specific needs and requirements.",
        image: step1,
      },
      {
        number: "02",
        title: "Customize Your Order",
        description:
          "Provide details and special instructions for your package through our intuitive interface.",
        image: step2,
      },
      {
        number: "03",
        title: "Confirm & Track",
        description:
          "Review your order details and track your package in real-time through our tracking system.",
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
          bgColor: "bg-white",
        },
        {
          icon: <Clock className="w-8 h-8 text-purple-600" />,
          heading: "Real-time Tracking",
          description: "Live package tracking from pickup to delivery",
          bgColor: "bg-white",
        },
        {
          icon: <Shield className="w-8 h-8 text-purple-600" />,
          heading: "Secure Handling",
          description: "Fully insured and protected packages",
          bgColor: "bg-white",
        },
      ],
      secondRowFirstCard: {
        icon: <Package className="w-8 h-8 text-purple-600" />,
        heading: "Custom Packaging",
        description: "We provide specialized packaging for fragile items",
        bgColor: "bg-white",
      },
      twoColumnCard: {
        heading: "Start Shipping Today",
        description: "Join thousands of satisfied customers using our platform",
        buttonText: "Get Started Now",
        image: Dme,
        bgColor: "bg-purple-50",
      },
    },
  },
  "car-towing": {
    hero: {
      image: step1,
      headingPart1: "24/7 Professional",
      headingPart2: "Car Towing Service",
      description:
        "Get instant assistance with our reliable car towing service. We'll notify you when our service becomes available in your area.",
      buttonText: "Get Notified",
    },
    whySection: {
      mainHeading: "Why Choose Our",
      highlight: "Towing Service",
      firstRowCards: [
        {
          icon: <Clock className="w-8 h-8 text-purple-600" />,
          heading: "24/7 Service",
          description: "Round-the-clock emergency towing assistance",
          bgColor: "bg-white",
        },
        {
          icon: <Shield className="w-8 h-8 text-purple-600" />,
          heading: "Licensed Experts",
          description: "Professional and certified towing operators",
          bgColor: "bg-white",
        },
        {
          icon: <Truck className="w-8 h-8 text-purple-600" />,
          heading: "Quick Response",
          description: "Fast arrival times for emergency situations",
          bgColor: "bg-white",
        },
      ],
      secondRowFirstCard: {
        icon: <Mail className="w-8 h-8 text-purple-600" />,
        heading: "Stay Updated",
        description: "Get notifications about service availability",
        bgColor: "bg-white",
      },
      twoColumnCard: {
        heading: "Join Our Waitlist",
        description: "Be the first to know when we launch in your area",
        buttonText: "Subscribe Now",
        image: Dme,
        bgColor: "bg-purple-50",
      },
    },
  },
  "buy-store": {
    hero: {
      image: step1,
      headingPart1: "Shop & Ship",
      headingPart2: "with Confidence",
      description:
        "Purchase from your favorite stores and let us handle the delivery. Easy shopping, reliable shipping!",
      buttonText: "Start Shopping",
    },
    hasSteps: true,
    steps: [
      {
        number: "01",
        title: "Browse & Select",
        description: "Browse through our partner stores and select your items",
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
          bgColor: "bg-white",
        },
        {
          icon: <Truck className="w-8 h-8 text-purple-600" />,
          heading: "Fast Shipping",
          description: "Quick delivery of your purchases",
          bgColor: "bg-white",
        },
        {
          icon: <Shield className="w-8 h-8 text-purple-600" />,
          heading: "Buyer Protection",
          description: "Full protection on all purchases",
          bgColor: "bg-white",
        },
      ],
      secondRowFirstCard: {
        icon: <Clock className="w-8 h-8 text-purple-600" />,
        heading: "24/7 Support",
        description: "Round-the-clock customer service assistance",
        bgColor: "bg-white",
      },
      twoColumnCard: {
        heading: "Start Shopping Now",
        description: "Access thousands of products from top retailers",
        buttonText: "Explore Stores",
        image: Dme,
        bgColor: "bg-purple-50",
      },
    },
  },
};

const ServicePage: React.FC = () => {
  const router = useRouter();
  const { serviceType } = router.query;

  // Handle loading state
  if (!serviceType || typeof serviceType !== "string") {
    return <div>Loading...</div>;
  }

  const config = serviceConfigs[serviceType];

  // Handle invalid service type
  if (!config) {
    return <div>Service not found</div>;
  }

  return (
    <>
      <ServicesHerosection {...config.hero}>
        {serviceType === "car-towing" && <EmailNotification />}
      </ServicesHerosection>

      {config.hasSteps && config.steps && (
        <ThreeStepsSection
          mainHeadingPart1="How to Get"
          mainHeadingPart2="Started with Your Order"
          steps={config.steps}
        />
      )}

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
