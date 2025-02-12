import { useState } from "react";
import { Tp } from "../../public/svgs/Tp";
import { Frc } from "../../public/svgs/Frc";
import { Cf } from "../../public/svgs/Cf";

type ActiveTab = "customers" | "riders";

export default function DifferenceSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("customers");

  const customerCards = [
    {
      icon: <Tp />,
      title: "Transparent Pricing",
      description: "Pay only for what you order—no hidden costs or markups.",
    },
    {
      icon: <Frc />,
      title: "Fast and Reliable Services",
      description: "Quick deliveries and rides tailored to your schedule.",
    },
    {
      icon: <Cf />,
      title: "Community-Focused",
      description:
        "Proudly Australian, supporting local drivers and businesses.",
    },
  ];

  const riderCards = [
    {
      icon: <Tp />,
      title: "Transparent Pricing",
      description: "Pay only for what you order—no hidden costs or markups.",
    },
    {
      icon: <Frc />,
      title: "Fast and Reliable Services",
      description: "Quick deliveries and rides tailored to your schedule.",
    },
    {
      icon: <Cf />,
      title: "Community-Focused",
      description:
        "Proudly Australian, supporting local drivers and businesses.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Are We Different?
      </h2>

      <div className="flex justify-center mb-12">
        <nav className="flex border p-1 rounded-full bg-gray-100">
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-6 py-2 rounded-full ${
              activeTab === "customers"
                ? "bg-purple-600 text-white"
                : "bg-transparent text-gray-600"
            }`}
          >
            For Customers
          </button>
          <button
            onClick={() => setActiveTab("riders")}
            className={`px-6 py-2 rounded-full ${
              activeTab === "riders"
                ? "bg-purple-600 text-white"
                : "bg-transparent text-gray-600"
            }`}
          >
            For Riders
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(activeTab === "customers" ? customerCards : riderCards).map(
          (card, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 "
            >
              <div className="mb-4 ">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
