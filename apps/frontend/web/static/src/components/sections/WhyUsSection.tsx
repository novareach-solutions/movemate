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
  <section className="py-20">
    <div className="container">
      <div className="text-left mb-16">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-xl mt-4">
          <span className="bg-purple-100 text-purple-600 px-2">{subtitle}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <img src={benefit.image} alt={benefit.title} className="  mb-4" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-left">{benefit.title}</h3>
              <p className="text-gray-600 text-left">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
