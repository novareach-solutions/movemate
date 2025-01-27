import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardsInstantSolutions from "@/components/CardsInstantSolutions";
import VamooseVsOthers from "@/components/VamooseVsOthers";
import BeAPartner from "@/components/BeAPartner";
import InstantSolutions from "@/components/InstantSolutions";
import MadeForAussies from "@/components/MadeForAussies";
import WhyChooseUs from "@/components/WhyChooseUs";
import TryUsNow from "@/components/TryUsNow";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  return (
    <>
      <Navbar />
      <CardsInstantSolutions />
      <WhyChooseUs />
      <MadeForAussies />
      <InstantSolutions />
      <VamooseVsOthers />
      <BeAPartner />
      <TryUsNow />
      <GetInTouch />
      <Footer />
    </>
  );
}
