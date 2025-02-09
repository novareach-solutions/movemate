import { useState } from "react";
import { ShieldCheck, Wallet, Bell, Clock, Award, Bike } from "lucide-react";

type ActiveTab = "customers" | "riders";

export default function DifferenceSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("customers");

  const customerCards = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Safe Rides",
      description: "Verified drivers and real-time tracking for your safety",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Flexible Payments",
      description:
        "Multiple payment options including cash and digital wallets",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Instant Notifications",
      description: "Real-time updates about your ride and driver",
    },
  ];

  const riderCards = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Hours",
      description: "Work whenever you want with no fixed schedules",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Earnings",
      description: "Competitive rates and daily payout options",
    },
    {
      icon: <Bike className="w-6 h-6" />,
      title: "Support",
      description: "24/7 support team for riders",
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
              className="flex flex-col items-center text-center p-6 shadow-lg rounded-xl"
            >
              <div className="mb-4 p-4 bg-purple-100 rounded-full">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
