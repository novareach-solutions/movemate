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
    <section className="bg-[#8123AD] bg-opacity-[8%] text-black py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-[40px] font-bold font-gilroy text-center mb-12">
          Mission, Vision & Values
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Accordions */}
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} className="border-b border-purple-400">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify- gap-4 items-center w-full py-[40px]"
                >
                  <h3
                    className={`text-xl font-semibold text-left ${
                      activeAccordion === index
                        ? "text-[#8123AD] lg:text-[40px] font-gilroy font-bold"
                        : "text-black lg:text-[40px] font-gilroy font-bold"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5615 12.333H0.328125V9.66634H16.5615L9.09479 2.19967L10.9948 0.333008L21.6615 10.9997L10.9948 21.6663L9.09479 19.7997L16.5615 12.333Z"
                      fill="#8123AD"
                    />
                  </svg>
                </button>

                {activeAccordion === index && (
                  <div className="pb-6">
                    <p className=" leading-relaxed">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="hidden lg:block">
            <div className="">
              <img src="/images/msv.png" alt="Feature Icon" />{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
