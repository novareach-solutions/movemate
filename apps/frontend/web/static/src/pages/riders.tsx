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

export default function RiderPage() {
  // Updated data for WhyUsSection using images from the public folder
  const whyUsData = {
    title: "Why Choose Us",
    subtitle: "Benefits of joining",
    benefits: [
      {
        image: "/images/why1.png", // image stored in public/images/why1.png
        title: "Flexible Hours",
        description: "Work whenever you want with our 24/7 availability system",
      },
      {
        image: "/images/why2.png", // image stored in public/images/why1.png
        title: "Instant Payouts",
        description: "Get paid immediately after completing each job",
      },
      {
        image: "/images/why3.png", // image stored in public/images/why1.png
        title: "Full Support",
        description: "24/7 customer support and rider assistance",
      },
    ],
  };

  // Updated data for SignupEssentials using Lucide icons instead of URL placeholders
  const signupEssentialsData = {
    title: "Signup Essentials",
    tabs: [
      {
        tab: "On-Demand Delivery",
        cards: [
          {
            // Use the imported Lucide icon as a JSX element
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
    ],
  };

  // Updated data for FlexibleModels using images from the public folder
  const flexibleModelsData = {
    sections: [
      {
        image: "/images/schedule.png", // image stored in public/images/schedule.png
        title: "Choose Your Schedule",
        description: "Work when you want, how you want",
        points: [
          "Set your own hours",
          "Pause anytime",
          "Boost hours during peak times",
          "Weekly hour goals",
        ],
        buttonText: "View Schedule Options",
      },
      {
        image: "/images/earning-models.png", // image stored in public/images/earning-models.png
        title: "Multiple Earning Models",
        description: "Different ways to maximize your earnings",
        points: [
          "Per delivery commission",
          "Hourly rates",
          "Surge pricing",
          "Tips from customers",
        ],
        buttonText: "See Earning Models",
      },
    ],
  };

  // Sample data for FAQs (remains unchanged)
  const faqData = {
    title: "Rider FAQs",
    faqs: [
      {
        question: "How much can I earn?",
        answer:
          "Riders typically earn between $15-$30 per hour depending on time and location",
      },
      {
        question: "What are the vehicle requirements?",
        answer:
          "Any reliable vehicle in good condition - car, bike, or scooter",
      },
      {
        question: "How do I get paid?",
        answer: "Weekly direct deposit or instant cashout to your bank account",
      },
      {
        question: "Is there rider support?",
        answer: "24/7 support through in-app chat and phone support",
      },
    ],
  };

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
        title="Signup Essentials"
        tabs={signupEssentialsData.tabs}
      />

      <FlexibleModels sections={flexibleModelsData.sections} />
      <TryUsNow />

      <FAQs {...faqData} />
    </main>
  );
}
