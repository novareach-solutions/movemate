import React from "react";
import Link from "next/link";
import logo2 from "../../public/images/logo2.png";
import email from "../../public/icons/email.svg";
import location from "../../public/icons/location.svg";
import phone from "../../public/icons/phone.svg";
import facebook from "../../public/icons/facebook.svg";
import instagram from "../../public/icons/instagram.svg";
import linkedIn from "../../public/icons/linkedIn.svg";
import twitter from "../../public/icons/twitter.svg";
import youTube from "../../public/icons/youTube.svg";
import Image, { StaticImageData } from "next/image";

type NavigationItem = {
  name: string;
  href: string;
  width?: string;
  icon?: StaticImageData;
};

type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

const Footer = () => {
  const navigation: NavigationSection[] = [
    {
      title: "Services",
      items: [
        { name: "Send A Package", href: "#" },
        { name: "Car Towing", href: "#" },
        { name: "Buy from a store", href: "#" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About Us", href: "#" },
        { name: "Ride with us", href: "#" },
      ],
    },
    {
      title: "Legal",
      items: [
        { name: "Terms and conditions", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "Contact Us",
      items: [
        { icon: email, name: "contact@company.com", href: "#" },
        { icon: phone, name: "(414)687-5892", href: "#" },
        {
          icon: location,
          name: "794 Mcallister St San Francisco, 94102",
          href: "#",
        },
      ],
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      href: "#",
      icon: facebook,
      width: "w-[min(3.585vw,14px)] md:w-[min(0.725vw,14px)]",
    },
    {
      name: "Twitter",
      href: "#",
      icon: twitter,
      width: "w-[min(6.135vw,24px)] md:w-[min(1.25vw,24px)]",
    },
    {
      name: "Instagram",
      href: "#",
      icon: instagram,
      width: "w-[min(6.135vw,24px)] md:w-[min(1.25vw,24px)]",
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: linkedIn,
      width: "w-[min(6.135vw,24px)] md:w-[min(1.25vw,24px)]",
    },
    {
      name: "YouTube",
      href: "#",
      icon: youTube,
      width: "w-[min(6.905vw,27px)] md:w-[min(1.405vw,27px)]",
    },
  ];

  return (
    <footer className="w-full h-full bg-primary text-white flex flex-col items-center justify-center rounded-t-[min(10.235vw,40px)] md:rounded-t-[min(4.6875vw,90px)] relative overflow-hidden ">
      <div className="w-full h-full max-w-[90%] md:max-w-[85%]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-[min(12.785vw,50px)] md:gap-[min(6.75vw,130px)] pt-[min(10.235vw,40px)] md:pt-[min(4.6875vw,90px)] ">
          <Link href="/">
            <Image
              src={logo2}
              alt="Logo"
              className=" pb-[min(2.55vw,10px)] md:pb-0 w-[min(21.75vw,85px)] md:w-[min(6.75vw,130px)] "
            />
          </Link>
          {navigation.map((section) => (
            <div
              key={section.title}
              className="flex flex-col gap-[min(6.395vw,25px)] md:gap-[min(2.085vw,40px)]"
            >
              <div className="text-[min(4.605vw,18px)] md:text-[min(1.5625vw,30px)] font-bold">
                {section.title}
              </div>
              <ul className="flex flex-col gap-[min(6.395vw,25px)] md:gap-[min(1.305vw,25px)]">
                {section.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="font-sans text-[min(3.835vw,15px)] md:text-[min(1.045vw,20px)] font-medium flex items-center gap-[min(3.835vw,15px)] md:gap-[min(0.785vw,15px)]"
                    >
                      {/* Render icon only if it exists */}
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={item.name}
                          className={`w-[min(5.625vw,22px)] md:w-[min(1.145vw,22px)] `}
                        />
                      )}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="  pb-[min(43.475vw,170px)] md:pb-[min(17.185vw,330px)] pt-[min(30.695vw,120px)] md:pt-[min(7.815vw,150px)] flex justify-center items-center gap-[min(11.55vw,45px)] md:gap-[min(3.645vw,70px)]  ">
          {socialMedia.map((item) => (
            <Link key={item.name} href={item.href} aria-label={item.name}>
              <Image
                src={item.icon}
                alt={item.name}
                className={`${item.width}  `}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className=" bg-primary text-white opacity-10 font-gilroy font-bold leading-none text-[min(20.465vw,80px)] md:text-[min(20.835vw,400px)] absolute -bottom-[min(7.675vw,30px)] md:-bottom-[min(8.075vw,155px)]">
        VAMOOSE
      </div>
    </footer>
  );
};

export default Footer;
