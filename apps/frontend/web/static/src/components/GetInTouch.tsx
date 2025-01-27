import Image from "next/image";
import React from "react";
import phone from "../../public/icons/call.svg";
import person from "../../public/icons/person.svg";
import mail from "../../public/icons/mail.svg";
import twitter from "../../public/icons/twitter2.svg";
import instagram from "../../public/icons/instagram2.svg";
import linkedIn from "../../public/icons/linkedIn2.svg";

const GetInTouch: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-full h-full font-sans my-[7.5%] md:my-[3.75%] p-0 py-[min(9.465vw,37px)] px-[min(6.645vw,26px)] md:p-[min(4.165vw,80px)] gap-[min(8.185vw,32px)] md:gap-[min(4.165vw,80px)] max-w-[90%] md:max-w-[85%] flex flex-col items-start border border-[#7f34a532] rounded-[min(2.815vw,11px)] md:rounded-[min(1.355vw,26px)] text-black">
        <div className=" flex flex-col gap-[min(2.1045vw,8px)] md:gap-[min(0.675vw,13px)] ">
          <div className=" text-[#3B3838] font-gilroy font-bold text-[min(7.165vw,28px)] md:text-[min(2.55vw,49px)] ">
            Let&apos;s get in touch!
          </div>
          <div className=" text-[#2D2D2D] font-normal text-[min(4.095vw,16px)] md:text-[min(1.405vw,27px)] ">
            Got questions? Our team is here to help. Contact us for quick and
            friendly support.
          </div>
        </div>
        <div className=" w-full flex flex-col-reverse md:flex-row gap-[min(8.185vw,32px)] md:gap-[min(4.165vw,80px)] ">
          <div className=" md:w-[37%] flex flex-col gap-[min(8.185vw,32px)] md:gap-[min(4.165vw,80px)]">
            <div className=" text-[#2D2D2D] flex flex-col gap-[min(4.095vw,16px)] md:gap-[min(1.355vw,26px)] ">
              <div className=" flex gap-[min(4.095vw,16px)] md:gap-[min(0.835vw,16px)] ">
                <Image
                  src={phone}
                  alt={"phone"}
                  className={`w-[min(7.675vw,30px)] md:w-[min(1.5625vw,30px)]  `}
                />
                <div className=" text-[min(4.095vw,16px)] md:text-[min(1.095vw,21px)] ">
                  +012 345 6789
                </div>
              </div>
              <div className=" flex gap-[min(4.095vw,16px)] md:gap-[min(0.835vw,16px)] ">
                <Image
                  src={mail}
                  alt={"mail"}
                  className={`w-[min(7.675vw,30px)] md:w-[min(1.5625vw,30px)]  `}
                />
                <div className=" text-[min(4.095vw,16px)] md:text-[min(1.095vw,21px)] ">
                  hello@genie.com
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-[min(4.095vw,16px)] md:gap-[min(1.355vw,26px)]  ">
              <div className=" font-bold text-[min(5.625vw,22px)] md:text-[min(1.405vw,27px)] ">
                Connect with us
              </div>
              <div className="flex gap-[min(5.375vw,21px)] md:gap-[min(1.095vw,21px)]">
                <Image
                  src={twitter}
                  alt={"twitter"}
                  className={`w-[min(10.235vw,40px)] md:w-[min(2.085vw,40px)]  `}
                />
                <Image
                  src={instagram}
                  alt={"instagram"}
                  className={`w-[min(10.235vw,40px)] md:w-[min(2.085vw,40px)]  `}
                />
                <Image
                  src={linkedIn}
                  alt={"linkedIn"}
                  className={`w-[min(10.235vw,40px)] md:w-[min(2.085vw,40px)]  `}
                />
              </div>
            </div>
          </div>
          <div className="md:w-[37%] flex flex-col md:gap-[min(1.355vw,26px)]  ">
            <div className="flex flex-col gap-[min(3.325vw,13px)] md:gap-[min(0.675vw,13px)] text-[min(3.585vw,14px)] md:text-[min(1.095vw,21px)] ">
              <div className=" flex items-center rounded-[min(1.795vw,7px)] md:rounded-[min(0.365vw,7px)] border border-[#2d2d2d30] py-[min(3.835vw,15px)] px-[min(6.135vw,24px)] md:py-[min(1.195vw,23px)] md:px-[min(1.355vw,26px)] ">
                <Image
                  src={person}
                  alt={"person"}
                  className={`w-[min(7.675vw,30px)] md:w-[min(1.5625vw,30px)]  `}
                />
                <div className="h-[min(6.65vw,26px)] md:h-[min(1.35vw,26px)] border-r-2 border-[#2d2d2d30] mx-[min(3.065vw,12px)] md:mx-[min(0.625vw,12px)]"></div>{" "}
                <input placeholder="Full Name" />
              </div>
              <div className=" flex rounded-[min(1.795vw,7px)] md:rounded-[min(0.365vw,7px)] border border-[#2D2D2D30] py-[min(3.835vw,15px)] px-[min(6.135vw,24px)] md:py-[min(1.195vw,23px)] md:px-[min(1.355vw,26px)] ">
                <Image
                  src={mail}
                  alt={"mail"}
                  className={`w-[min(7.675vw,30px)] md:w-[min(1.5625vw,30px)]  `}
                />
                <div className="h-[min(6.65vw,26px)] md:h-[min(1.35vw,26px)] border-r-2 border-[#2d2d2d30] mx-[min(3.065vw,12px)] md:mx-[min(0.625vw,12px)]"></div>{" "}
                <input placeholder="Email" />
              </div>
            </div>
            <button className=" w-fit hidden md:block bg-primary font-bold text-white text-[min(1.095vw,21px)] rounded-[min(0.675vw,13px)] py-[min(1.195vw,23px)] px-[min(4.475vw,86px)] ">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
