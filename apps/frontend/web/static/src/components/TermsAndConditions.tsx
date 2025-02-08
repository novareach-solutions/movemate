import React from "react";

interface TermsSection {
  title: string;
  paragraphs: string[];
}

interface TermsAndConditionsProps {
  sections: TermsSection[];
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  sections,
}) => {
  return (
    <div className="px-4 md:px-[300px] py-8">
      <h1 className="text-3xl md:text-[45px] font-gilroy font-bold mb-8 md:mb-[60px] mt-4 md:mt-[30px]">
        Terms and Conditions
      </h1>
      {sections.map((section, index) => (
        <div key={index} className="mb-8 md:mb-[60px]">
          <h2 className="text-2xl md:text-[32px] font-gilroy text-[#8123AD] font-semibold mb-4 md:mb-[60px]">
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph, pIndex) => (
            <p key={pIndex} className="mb-6 md:mb-[50px]">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TermsAndConditions;
