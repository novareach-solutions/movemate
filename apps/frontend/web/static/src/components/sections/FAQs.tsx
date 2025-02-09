import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../primitives/accordian";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
  category: string; // Each FAQ belongs to a category
}

interface FAQsProps {
  title: string;
  faqs: FAQ[];
  categories: string[]; // List of category names for the tabs
}

export const FAQs = ({ title, faqs, categories }: FAQsProps) => {
  // Initialize state with the first category as default
  const [activeCategory, setActiveCategory] = React.useState(categories[0]);

  // Filter FAQs based on the currently active category
  const filteredFAQs = faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section className="py-20">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>

        {/* Render category tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 text-sm font-medium transition-colors",
                activeCategory === category
                  ? "border-b text-purple-600"
                  : "text-gray-700"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Render FAQs in an Accordion */}
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
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
