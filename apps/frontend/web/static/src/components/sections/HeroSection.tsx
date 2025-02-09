interface HeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  formTitle: string;
  formDescription: string;
}

export const HeroSection = ({
  title,
  description,
  buttonText,
  formTitle,
  formDescription,
}: HeroSectionProps) => (
  <section
    className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
    style={{
      backgroundImage: `url('/ridersBg.png')`, // Background image
    }}
  >
    {/* Responsive Container */}
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-[400px] px-4 md:px-8 lg:px-20">
      {/* Left Content */}
      <div className="text-black space-y-6 max-w-full md:max-w-[639px]">
        <h1 className="text-3xl md:text-[45px] font-bold leading-snug md:leading-[65px]">
          {title.split(" ").map((word, index) =>
            index < 5 ? (
              <span key={index} className="text-[#8123AD]">
                {word}{" "}
              </span>
            ) : (
              <span key={index}>{word} </span>
            )
          )}
        </h1>
        <p className="text-base md:text-xl">{description}</p>
        <button className="bg-[#8123AD] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg">
          {buttonText}
        </button>
      </div>

      {/* Right Form Container */}
      <div className="bg-[#F8F5FB] p-6 md:p-8 border border-[#8123AD] rounded-xl w-full max-w-md md:max-w-[535px] lg:h-[536px]">
        <h2 className="text-2xl md:text-[28px] font-bold mb-4">{formTitle}</h2>
        <p className="text-[#777777] mb-6 md:mb-[35px]">{formDescription}</p>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg"
          />
          <button className="w-full text-[#8123AD] text-lg font-semibold border border-[#8123AD] mt-6 md:mt-[35px] md:h-[60px] rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
);
