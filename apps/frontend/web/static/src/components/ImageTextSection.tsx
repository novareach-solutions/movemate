import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ImageTextSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="order-last lg:order-first">
            <div className="relative h-96 w-full rounded-xl overflow-hidden">
              {/* Replace with your actual image */}
              <div className="bg-gray-100 h-full w-full flex items-center justify-center text-gray-400">
                Company/Team Image
              </div>
              {/* <Image 
                src="/your-image-path.jpg"
                alt="Our Team"
                layout="fill"
                objectFit="cover"
              /> */}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Building the Future of{" "}
              <span className="text-purple-600">Urban Mobility</span> with{" "}
              <span className="text-purple-600">Innovation</span>
            </h2>

            <p className="text-gray-600 text-lg">
              We're reimagining transportation for the modern world, combining
              cutting-edge technology with sustainable practices to create
              seamless urban mobility solutions.
            </p>

            <p className="text-gray-600 text-lg">
              Our platform connects millions of users daily, offering reliable,
              affordable, and eco-friendly transportation options that adapt to
              your lifestyle.
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
