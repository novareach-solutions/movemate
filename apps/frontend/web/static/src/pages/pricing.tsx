import { FAQs } from "@/components/sections/FAQs";
import TryUsNow from "@/components/TryUsNow";
import { Sparkles, CheckCircle } from "lucide-react";

export default function PricingPage() {
  const pricingPlans = [
    {
      title: "Starter",
      price: "29",
      originalPrice: "49",
      features: ["Basic features", "Up to 5 projects", "3 team members"],
    },
    {
      title: "Professional",
      price: "79",
      originalPrice: "99",
      features: [
        "Advanced analytics",
        "Unlimited projects",
        "Priority support",
        "Custom domains",
      ],
    },
    {
      title: "Enterprise",
      price: "199",
      originalPrice: "299",
      features: [
        "Dedicated support",
        "Single sign-on",
        "Advanced security",
        "Custom reporting",
      ],
    },
  ];
  // Sample data for FAQs (remains unchanged)
  const faqsData = [
    // Profile Category
    {
      question: "How do I become a Vamoose rider?",
      answer:
        "You can sign up via the Vamoose app by providing your personal details, uploading required documents (e.g., driver’s license, ID, and vehicle registration), and completing the verification process.",
      category: "Profile",
    },
    {
      question: "What if I want to work part-time or only on weekends?",
      answer:
        "You’re free to choose your own schedule. Simply go online whenever you want to take deliveries or rides, and sign out when you’re done.",
      category: "Profile",
    },

    // Subscription Category
    {
      question: "What are the subscription options, and how do they work?",
      answer:
        "Vamoose offers different subscription tiers—Basic, Pro, and Premium. Each tier provides varying levels of benefits, such as reduced service fees, priority requests, and higher incentive bonuses. Once you choose a subscription, your subscription fee is automatically deducted from your Vamoose account at the start of each billing cycle.",
      category: "Subscription",
    },

    // Payment Category
    {
      question: "How do I get paid?",
      answer:
        "Payments are deposited directly to your registered bank account or digital wallet on a weekly or bi-weekly schedule. You can view your earnings summary in the Vamoose app at any time.",
      category: "Payment",
    },
    {
      question: "Do riders get any bonuses or incentives?",
      answer:
        "Yes! We regularly run bonus programs or referral incentives for riders who complete a certain number of rides or deliveries, or who refer new riders to the platform.",
      category: "Payment",
    },

    // Support Category
    {
      question:
        "What happens if I encounter an issue during a delivery or ride?",
      answer:
        "If you experience any issue—such as a flat tire, an unresponsive customer, or an in-app error—contact Vamoose Support through the app. We have 24/7 support to assist you with any emergencies or technical problems.",
      category: "Support",
    },
    {
      question: "What benefits do riders get with Vamoose?",
      answer:
        "Apart from flexible working hours and competitive pay, our riders enjoy features like in-app route optimization, real-time earnings tracking, and exclusive partner discounts on vehicle maintenance.",
      category: "Support",
    },
  ];

  // Categories (if you're using tabs, filters, etc.)
  const categories = [
    "Profile",
    "Subscription",
    "Payment",
    "Support",
    "Profile",
    ,
    "Profile",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative pt-20 pb-32 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, #F3E8FF 0%, rgba(243, 232, 255, 0) 100%)`,
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pattern-checkered pattern-gray-400 pattern-size-6" />

        {/* Top Left Dots */}
        <div className="absolute top-20 left-20 space-y-4 opacity-30">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-2 h-2 bg-gray-400 rounded-full" />
              ))}
            </div>
          ))}
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Transparent Pricing for
              <span className="text-purple-600"> All Business Sizes</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            Choose the perfect plan for your needs. Scale up or down as your
            business grows.
          </p>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div
        className="relative mx-[100px] py-20 -mt-32"
        style={{ backgroundColor: "#2A1D3D" }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at center, #582A65 0%, transparent 70%)`,
          }}
        />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/5"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {plan.title}
                </h3>

                <div className="flex items-end gap-2 mb-8">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 line-through">
                    ${plan.originalPrice}
                  </span>
                </div>

                <div className="space-y-4 min-h-[200px]">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-300 flex-shrink-0 mt-1" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FAQs
        title="Frequently Asked Questions"
        faqs={faqsData}
        categories={categories}
      />
      <TryUsNow />
    </div>
  );
}
