interface BenefitCard {
  image: string;
  title: string;
  description: string;
}

interface WhyUsSectionProps {
  title: string;
  subtitle: string;
  benefits: BenefitCard[];
}

export const WhyUsSection = ({
  title,
  subtitle,
  benefits,
}: WhyUsSectionProps) => (
  <section className="min-h-screen w-full py-20">
    <div className="px-4 md:px-10 lg:px-24">
      {/* Title and Subtitle */}
      <div className="text-left mb-16 pl-4 md:pl-8 lg:pl-16 max-w-4xl">
        <p className="text-sm md:text-base mb-6 md:mb-9 font-bold">
          <span className="bg-purple-100 text-purple-600 rounded-lg px-2 py-1">
            {subtitle}
          </span>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title.split(" ").map((word, index) =>
            index < 2 ? (
              <span key={index} className="text-purple-600">
                {word}{" "}
              </span>
            ) : (
              <span key={index}>{word} </span>
            )
          )}
        </h2>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-start">
            <img
              src={benefit.image}
              alt={benefit.title}
              className="w-full h-auto mb-4"
            />
            <div className="space-y-4 pl-4 md:pl-8">
              <h3 className="text-lg md:text-xl font-bold font-gilroy text-left">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-left w-full lg:w-[424px] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
