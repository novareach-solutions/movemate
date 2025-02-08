interface FlexibleModelSection {
  image: string;
  title: string;
  description: string;
  points: string[];
  buttonText: string;
}

interface FlexibleModelsProps {
  sections: FlexibleModelSection[];
}

export const FlexibleModels = ({ sections }: FlexibleModelsProps) => (
  <section className="py-20">
    <div className="container space-y-20">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row gap-12 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
        >
          <div className="md:w-1/2">
            <img
              src={section.image}
              alt={section.title}
              className="rounded-xl"
            />
          </div>

          <div className="md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold">{section.title}</h3>
            <p className="text-gray-600">{section.description}</p>
            <ul className="space-y-4">
              {section.points.map((point, i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-2">→</span>
                  {point}
                </li>
              ))}
            </ul>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg">
              {section.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);
