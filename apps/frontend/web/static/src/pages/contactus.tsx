// pages/contact.tsx
import React from "react";
import Image from "next/image";
import twitter from "../../public/icons/twitter2.svg";
import instagram from "../../public/icons/instagram2.svg";
import linkedIn from "../../public/icons/linkedIn2.svg";

const ContactUs = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const socialLinks = [
    { icon: twitter, alt: "X" },
    { icon: instagram, alt: "Instagram" },
    { icon: linkedIn, alt: "LinkedIn" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Contact Info */}
        <div className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Customer Support
          </h2>
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-bold">Email:</span>
              <span className="text-gray-600">Support@vamoose.in</span>
            </div>
            <div className="font-bold text-lg mb-2">Find us on</div>
            <div className="flex gap-4">
              {socialLinks.map(({ icon, alt }) => (
                <Image key={alt} src={icon} alt={alt} className="w-8 h-8" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-[#FCF5FF] bg-opacity-80 border-2 border-[#8123AD] rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Carter"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 9876383078"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Please type your message here..."
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Terms & Privacy */}
            <p className="text-sm text-gray-700">
              By contacting us you agree to the{" "}
              <a
                href="#"
                className="text-[#8123AD] underline hover:no-underline"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#8123AD] underline hover:no-underline"
              >
                Privacy Policy
              </a>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 text-[#8123AD] text-base font-bold border border-[#8123AD] rounded-lg transition-colors duration-300 hover:bg-[#8123AD] hover:text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
