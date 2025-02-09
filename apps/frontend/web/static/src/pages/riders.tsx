import ComparisonCards from "@/components/ComparisonTable";
import { FAQs } from "@/components/sections/FAQs";
import { FlexibleModels } from "@/components/sections/FlexibleModels";
import { HeroSection } from "@/components/sections/HeroSection";
import { SignupEssentials } from "@/components/sections/SignupEssentials";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import TryUsNow from "@/components/TryUsNow";
import VamooseVsOthers from "@/components/VamooseVsOthers";

// Import some icons from Lucide
import { Check, FileText, RefreshCcw } from "lucide-react";
import { Require } from "../../public/svgs/require";
import { Document } from "../../public/svgs/Document";
import { Signup } from "../../public/svgs/Signup";

export default function RiderPage() {
  // Updated data for WhyUsSection using images from the public folder
  const whyUsData = {
    title: "The Benefits of Driving with Us",
    subtitle: "WHY US?",
    benefits: [
      {
        image: "/images/why1.png", // image stored in public/images/why1.png
        title: "Keep 100% of Your Earnings",
        description:
          "With Vamoose, you take home every dollar you earn. Say goodbye to hefty commission fees and hello to more money in your pocket.",
      },
      {
        image: "/images/why2.png", // image stored in public/images/why1.png
        title: "Flexible Work, Fair Pricing",
        description:
          "Choose how you work with subscription or low-commission models. Whether you ride full-time or part-time, there’s a plan to suit your lifestyle.",
      },
      {
        image: "/images/why3.png", // image stored in public/images/why1.png
        title: "Fair and Transparent Pricing",
        description:
          "No hidden fees or deductions. With Vamoose, you’ll always know what you’re earning, giving you complete control over your income.",
      },
    ],
  };

  // Updated data for SignupEssentials using Lucide icons instead of URL placeholders
  const signupEssentialsData = {
    title: "Here’s What You Need To Sign Up",
    subtitle: "Signup ",
    tabs: [
      {
        tab: "On-Demand Delivery",
        cards: [
          {
            // Use the imported Lucide icon as a JSX element
            icon: <Require />,
            title: "Requirements",
            points: [
              "Be at least 18 years old",
              "Clear a background screening",
            ],
          },
          {
            icon: <Document />,
            title: "Documents",
            points: [
              "Valid Driver’s License (private or commercial), if you plan to drive",
              "Proof of residency in your city, state or province",
              "Car documents such as commercial insurance, vehicle registration certificate, permit",
            ],
          },
          {
            icon: <Signup />,
            title: "Process",
            points: [
              "Visit the nearest Partner Seva Kendra in your city",
              "Submit documents and photo",
              "Provide information for a background check",
            ],
          },
        ],
      },
      {
        tab: "Car Towing",
        cards: [
          {
            icon: <Check size={24} />,
            title: "Requirements",
            points: [
              "Valid driver's license",
              "Smartphone (iOS/Android)",
              "18+ years old",
              "Clean background check",
            ],
          },
          {
            icon: <FileText size={24} />,
            title: "Documents",
            points: [
              "ID Proof",
              "Vehicle insurance",
              "Bank account details",
              "Profile photo",
            ],
          },
          {
            icon: <RefreshCcw size={24} />,
            title: "Process",
            points: [
              "Submit application",
              "Document verification",
              "Training session",
              "Start earning!",
            ],
          },
        ],
      },
      {
        tab: "House Moving",
        cards: [
          {
            // Use the imported Lucide icon as a JSX element
            icon: <Require />,
            title: "Requirements",
            points: [
              "Be at least 18 years old",
              "Clear a background screening",
            ],
          },
          {
            icon: <Document />,
            title: "Documents",
            points: [
              "Valid Driver’s License (private or commercial), if you plan to drive",
              "Proof of residency in your city, state or province",
              "Car documents such as commercial insurance, vehicle registration certificate, permit",
            ],
          },
          {
            icon: <Signup />,
            title: "Process",
            points: [
              "Visit the nearest Partner Seva Kendra in your city",
              "Submit documents and photo",
              "Provide information for a background check",
            ],
          },
        ],
      },
    ],
  };

  // Updated data for FlexibleModels using images from the public folder
  const flexibleModelsData = {
    sections: [
      {
        image: "/images/Sbm.png", // image stored in public/images/schedule.png
        title: "Subscription based model ",
        description: "Earn Directly with Zero Commissions and Full Control",
        points: [
          "0% commission 100% earning",
          "Flexible plans to fit your schedule",
          "No hidden charges. No surprises!",
        ],
        buttonText: "Explore Plans",
      },
      {
        image: "/images/Sbm2.png", // image stored in public/images/schedule.png
        title: "Low commision per ride model ",
        description: "Affordable, Pay-Per-Ride Model",
        paragraph: [
          "Pay a small commission per ride and enjoy the flexibility of earning without upfront costs. Ideal for part-time drivers or those who prefer a pay-as-you-go approach.",
        ],
      },
    ],
  };

  // Sample data for FAQs (remains unchanged)
  const faqsData = [
    {
      question: "What is your return policy?",
      answer: "Our return policy lasts 30 days...",
      category: "General",
    },
    {
      question: "How do I track my order?",
      answer: "You can track your order using...",
      category: "Orders",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries...",
      category: "Shipping",
    },
  ];

  const categories = ["General", "Orders", "Shipping"];

  return (
    <main>
      <HeroSection
        title="Keep 100% of Your Earnings with Our Zero-Commission Subscription"
        description="Empowering you to drive with freedom, work on your own terms, and earn what you need, when you need"
        buttonText="Download App"
        formTitle="Join our Riders Community"
        formDescription="Fill in your details and take the first step toward earning on your schedule."
      />
      <WhyUsSection {...whyUsData} />
      <VamooseVsOthers />
      <ComparisonCards />
      <SignupEssentials
        title="Here’s What You Need To Sign Up"
        subtitle="Signup Essentials"
        tabs={signupEssentialsData.tabs}
      />
      <FlexibleModels sections={flexibleModelsData.sections} />
      <TryUsNow />
      <FAQs
        title="Frequently Asked Questions"
        faqs={faqsData}
        categories={categories}
      />
      ;{" "}
    </main>
  );
}
