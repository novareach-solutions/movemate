import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function MissionVisionValues() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const items = [
    {
      title: "Mission",
      content:
        "Our mission is to revolutionize urban mobility through sustainable, affordable, and accessible transportation solutions for everyone.",
    },
    {
      title: "Vision",
      content:
        "To become the world's most trusted mobility platform, connecting people and cities through innovative technology and exceptional service.",
    },
    {
      title: "Values",
      content:
        "Safety first | Customer obsession | Sustainability driven | Community focused | Integrity always",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section className="bg-purple-600 text-white py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Mission, Vision & Values
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Accordions */}
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} className="border-b border-purple-400">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full py-4"
                >
                  <h3
                    className={`text-xl font-semibold text-left ${
                      activeAccordion === index
                        ? "text-purple-200"
                        : "text-white"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 transform transition-transform ${
                      activeAccordion === index
                        ? "rotate-180 text-purple-200"
                        : "text-white"
                    }`}
                  />
                </button>

                {activeAccordion === index && (
                  <div className="pb-6">
                    <p className="text-gray-100 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="hidden lg:block">
            <div className="bg-gray-100 rounded-xl h-96 w-full flex items-center justify-center text-purple-600">
              {/* Replace this div with your actual image */}
              <span>Company Image/Illustration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
