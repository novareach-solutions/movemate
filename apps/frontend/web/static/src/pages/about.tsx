import DifferenceSection from "@/components/DifferenceSection";
import ImageTextSection from "@/components/ImageTextSection";
import MissionVisionValues from "@/components/MissionVisionValues";
import React from "react";

export default function about() {
  return (
    <div>
      <img src="/images/about.png" alt="sd" />
      <DifferenceSection />
      <MissionVisionValues />
      <ImageTextSection />
    </div>
  );
}
