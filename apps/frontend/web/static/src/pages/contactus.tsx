// pages/contact.tsx
import React from "react";
import Image from "next/image";
import twitter from "../../public/icons/twitter2.svg";
import instagram from "../../public/icons/instagram2.svg";
import linkedIn from "../../public/icons/linkedIn2.svg";
const ContactUs = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : null;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const socialLinks = [
    { icon: twitter, alt: "twitter" },
    { icon: instagram, alt: "instagram" },
    { icon: linkedIn, alt: "linkedIn" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Customer Support
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <p className="font-gilroy font-bold">Email:</p>{" "}
              <span className="text-gray-600">support@vamoose.com</span>
            </div>
          </div>

          <div className="flex flex-col gap-[min(4.095vw,16px)] md:gap-[min(1.355vw,26px)]">
            <div className="font-bold text-[min(5.625vw,22px)] md:text-[min(1.405vw,27px)]">
              Find us on{" "}
            </div>
            <div className="flex gap-[min(5.375vw,21px)] md:gap-[min(1.095vw,21px)]">
              {socialLinks.map(({ icon, alt }) => (
                <Image
                  key={alt}
                  src={icon}
                  alt={alt}
                  className="w-[min(10.235vw,40px)] md:w-[min(2.085vw,40px)]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-[#FCF5FF] lg:w-[648px] lg:h-[781px] bg-opacity-[80%] p-8 border-[2px] border-[#8123AD] rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 -sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 -sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 -sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 -sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 -sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreed"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="agreed"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to receive emails from Vamoose and can unsubscribe at
                any time.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 py-3 px-4 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
