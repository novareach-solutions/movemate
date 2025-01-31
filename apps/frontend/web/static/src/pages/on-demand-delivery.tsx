import ServicesHerosection from "@/components/ServicesHerosection";
import React from "react";
import deliveryImage from "../../public/images/deliveryImage.png";
import ThreeStepsSection from "@/components/ThreeStepsSection";
import WhyVamoose from "@/components/WhyVamoose";
import { Truck, Clock, Shield, Package } from "lucide-react";

const Ondemand = () => {
  const steps = [
    {
      number: "01",
      title: "Select Your Service",
      description:
        "Choose from our range of delivery options tailored to your specific needs and requirements.",
      image: deliveryImage,
    },
    {
      number: "02",
      title: "Customize Your Order",
      description:
        "Provide details and special instructions for your package through our intuitive interface.",
      image: deliveryImage,
    },
    {
      number: "03",
      title: "Confirm & Track",
      description:
        "Review your order details and track your package in real-time through our tracking system.",
      image: deliveryImage,
    },
  ];
  const firstRowCards = [
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
  ];
  const twoColumnCard = {
    heading: "Start Shipping Today",
    description: "Join thousands of satisfied customers using our platform",
    buttonText: "Get Started Now",
    image: deliveryImage,
    bgColor: "bg-purple-50",
  };
  const secondRowFirstCard = {
    icon: <Package className="w-8 h-8 text-purple-600" />,
    heading: "Custom Packaging",
    description: "We provide specialized packaging for fragile items",
    bgColor: "bg-white",
  };

  return (
    <>
      <ServicesHerosection
        imageSrc={deliveryImage}
        // Optional props below (if you want to override defaults)
        // headingPart1="Custom Heading Part"
        // headingPart2="Custom Highlighted Text"
        // description="Custom description text"
        // buttonText="Custom Button"
      />
      <ThreeStepsSection
        mainHeadingPart1="How to Get"
        mainHeadingPart2="Started with Your Order"
        steps={steps}
      />
      <WhyVamoose
        mainHeading="Why Choose"
        highlight="Vamoose"
        secondRowFirstCard={secondRowFirstCard} // Pass unique content
        firstRowCards={firstRowCards}
        secondRowCard={twoColumnCard}
        firstRowBg="bg-gray-50"
        secondRowFirstBg="bg-white"
      />
    </>
  );
};
export default Ondemand;
