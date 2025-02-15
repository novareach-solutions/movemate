import React from "react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "../primitives/accordian";
import { AccordionContent } from "@radix-ui/react-accordion";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface FAQsProps {
  title: string;
  faqs: FAQ[];
  categories: string[];
}

export const FAQs = ({ title, faqs, categories }: FAQsProps) => {
  // Default to the first category
  const [activeCategory, setActiveCategory] = React.useState(categories[0]);

  // Filter FAQs based on the currently active category
  const filteredFAQs = faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section className="py-10 sm:py-16">
      <div className="mx-[150px] px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          {title}
        </h2>

        {/* Category Tabs (mimicking “Profile” tabs in your screenshot) */}
        <div className="flex justify-between space-x-6 mb-8 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "relative py-2 px-4 text-sm text-purple-600  font-medium text-gray-700 transition-colors",
                activeCategory === category
                  ? "border-b-2 border-purple-600"
                  : "hover:text-purple-600"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Accordion with filtered FAQs */}
        <Accordion
          type="single"
          collapsible
          className="divide-y divide-gray-200 border-gray-200"
        >
          {filteredFAQs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
