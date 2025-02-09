// src/components/Navbar.tsx

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo.png";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./primitives/dropdown";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <main className="w-full h-full flex justify-center items-center z-50">
      <nav className="w-full h-full flex justify-center items-center py-[min(10.25vw,40px)] md:py-[min(1.045vw,20px)] max-w-[90%] md:max-w-[85%]">
        <div className="w-full flex justify-between items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              className="w-[min(19.185vw,75px)] md:w-[min(7.8125vw,150px)]"
            />
          </Link>

          {/* Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>

          {/* Menu (Desktop) */}
          <div className="hidden md:flex gap-[min(2.605vw,50px)] font-medium text-[min(1.045vw,20px)] text-[#141414] items-center">
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center focus:outline-none">
                  Services
                  <svg
                    className="ml-2 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                <DropdownMenuItem>
                  <Link href="/services/on-demand-delivery">
                    Send a Package
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/services/buy-store">Buy from a store</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/services/car-towing">Car towing</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/riders">For Riders</Link>
            <Link href="/pricing">Plans</Link>
            <Link href="/about">About us</Link>

            <Link href="/contactus">Contact us</Link>
          </div>

          {/* Signup with Download Button */}
          <div className="hidden md:flex items-center font-semibold text-[min(0.9375vw,18px)] text-[#141414]">
            <Link href="/signup" className="flex items-center">
              Sign Up
            </Link>

            <div className="h-[min(1.25vw,24px)] border-r-2 border-[#777777] mx-[min(1.305vw,25px)]"></div>

            <Link
              className="bg-primary text-white text-[min(0.835vw,16px)] py-[min(0.835vw,16px)] px-[min(1.305vw,25px)] rounded-[min(0.415vw,8px)]"
              href="/download-app"
            >
              Download App
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md mt-4 md:hidden">
            <div className="flex flex-col items-center space-y-4 py-4">
              {/* Mobile Services Dropdown (Optional) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center focus:outline-none">
                    Services
                    <svg
                      className="ml-2 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <DropdownMenuItem>
                    <Link href="/service1">Send a Package</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/service2">Buy from a store</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/service3">Car towing</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/riders">For Riders</Link>
              <Link href="/contactus">Contact us</Link>
              <Link href="/signup">Sign Up</Link>
              <Link href="/download-app">Download</Link>
            </div>
          </div>
        )}
      </nav>
    </main>
  );
};

export default Navbar;
