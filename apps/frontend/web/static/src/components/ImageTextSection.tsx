import { ArrowRight } from "lucide-react";

export default function ImageTextSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="order-last lg:order-first">
            <div className="relative h-96 w-full rounded-xl overflow-hidden">
              <img src="/images/Jow.png" alt="Feature Icon" />{" "}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Join Our <span className="text-[#8123AD]">Growing Team!</span>{" "}
            </h2>

            <p className="text-gray-600 text-lg">
              Join us and help shape the future of fair and transparent
              services.Check out our open positions [insert link to careers
              page].
            </p>

            <p className="text-gray-600 text-lg">
              Don’t see a role that fits? Drop us your resume at [careers email
              address]—we’d love to hear from you!
            </p>

            <button
              onClick={() => (window.location.href = "/contact")} // Replace with your navigation logic
              className="flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full 
                        hover:bg-purple-700 transition-colors duration-300 text-lg"
            >
              Join Us Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
