import ContentLayout from "@/layouts/ContentLayout";
import rightArrowIcon from "../../public/icons/right-arrow.svg";
import madeforaussies from "../../public/images/madeforaussies.png";

const MadeForAussies = () => {
  return (
    <ContentLayout
      title="Made For Aussies"
      text="Proudly Australian, "
      highlightedText="Uniquely Yours!"
      description="At Vamoose, we embody Australian values of reliability, transparency, and fairness. Our tailored services ensure honest pricing, dependable support, and a personal touch, making every journey uniquely yours. Trust us to deliver a travel experience you can count on."
      buttonText="Save with Vamoose Now!"
      buttonIcon={rightArrowIcon}
      sectionImage={madeforaussies}
      sectionAlt="Made For Aussies"
      background="#FFFFFF"
      reverse={true}
    />
  );
};

export default MadeForAussies;
