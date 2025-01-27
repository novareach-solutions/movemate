import Image from "next/image";
import React from "react";
import playStore from "../../public/icons/googlePlay.svg";
import appStore from "../../public/icons/appStore.svg";
import phone from "../../public/images/phone.png";
import phone2 from "../../public/images/phoneMockup3.png";
import tryUs from "../../public/icons/tryUs.svg";

const TryUsNow: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className=" z-[0] w-full h-full font-sans my-[7.5%] md:my-[3.75%] pl-[min(4.345vw,17px)] md:pl-[min(3.905vw,75px)] md:pr-[min(1.305vw,25px)] max-w-[90%] md:max-w-[85%] flex justify-between items-end background-linear rounded-[min(1.275vw,5px)] md:rounded-[min(1.305vw,25px)] text-white relative overflow-hidden">
        <div className=" z-[1] py-[min(9.595vw,37.5px)] md:py-[min(6.515vw,125px)] flex flex-col gap-[min(2.05vw,8px)] md:gap-[min(0.9375vw,18px)]">
          <div className=" font-semibold text-[min(3.695vw,12px)] md:text-[min(1.305vw,25px)] ">
            Ready to Simplify Your Day?
          </div>
          <div className=" font-bold text-[min(4.605vw,18px)] md:text-[min(2.345vw,45px)]  ">
            Try Genie Now!
          </div>
          <div className=" hidden md:block font-medium text-[min(5.625vw,22px)] ">
            Simplify your life - all in one app.
          </div>
          <div className=" pt-[min(2.05vw,8px)] md:pt-[min(2.705vw,52px)] flex gap-[min(3.325vw,13px)] md:gap-[min(2.085vw,40px)] ">
            <Image
              src={playStore}
              alt={"button"}
              className={"w-[min(15.345vw,60px)] md:w-[min(8.85vw,170px)]"}
            />
            <Image
              src={appStore}
              alt={"button"}
              className={"w-[min(15.345vw,60px)] md:w-[min(8.85vw,170px)]"}
            />
          </div>
        </div>
        <div className="z-[1] ">
          <Image
            src={phone}
            alt="Phone"
            className=" hidden md:block z-[2] relative w-[min(37.235vw,715px)]"
          />
          <Image
            src={phone2}
            alt="Phone"
            className=" md:hidden flex z-[2] relative w-[min(43.475vw,170px)]"
          />
          <Image
            src={tryUs}
            alt="Phone"
            className=" absolute top-0 right-0 z-[1] w-[min(48.595vw,190px)] md:w-[min(32.55vw,625px)]"
          />
        </div>
      </div>
    </div>
  );
};

export default TryUsNow;
