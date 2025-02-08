import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../primitives/accordian";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQsProps {
  title: string;
  faqs: FAQ[];
}

export const FAQs = ({ title, faqs }: FAQsProps) => (
  <section className="py-20">
    <div className="container">
      <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
