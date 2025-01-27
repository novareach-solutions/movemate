import rightArrowIcon from "../../public/icons/right-arrow.svg";
import beapartner from "../../public/images/beapartner.png";
import ContentLayout from "@/layouts/ContentLayout";

const BeAPartner = () => {
  return (
    <ContentLayout
      title="Be a Partner"
      text="Want to Become "
      highlightedText="a Service Partner?"
      description="Join our team of service partners today! Whether it's delivering essentials, providing roadside assistance, or helping with home relocations, we offer flexible opportunities tailored to your skills. Be part of a reliable network dedicated to making lives easier!"
      buttonText="Learn More"
      buttonIcon={rightArrowIcon}
      sectionImage={beapartner}
      sectionAlt="Be A Partner"
      background="#F8F5FB"
      reverse={false}
    />
  );
};

export default BeAPartner;
