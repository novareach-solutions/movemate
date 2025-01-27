import rightArrowIcon from "../../public/icons/right-arrow.svg";
import whychooseus from "../../public/images/whychooseus.png";
import ContentLayout from "@/layouts/ContentLayout";

const WhyChooseUs = () => {
  return (
    <ContentLayout
      title="Why Choose Us?"
      text="Shop Smart: Pay Store Prices,"
      highlightedText=" Nothing More!"
      description="With Vamoose, you pay the exact store price for items—no hidden fees, no inflated costs. Our subscription model means no markup charges, ensuring you save at least 30% compared to other platforms. Enjoy transparent pricing, reliable service, and the satisfaction of supporting drivers who keep 100% of their earnings!"
      buttonText="Save with Vamoose Now!"
      buttonIcon={rightArrowIcon}
      sectionImage={whychooseus}
      sectionAlt="Why Choose Us"
      background={"#FFF"}
      reverse={false}
    />
  );
};

export default WhyChooseUs;
