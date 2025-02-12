interface FlexibleModelSection {
  image: string;
  title: string;
  description: string;
  points?: string[]; 
  paragraph?: string; 
  buttonText?: string;
}


interface FlexibleModelsProps {
  sections: FlexibleModelSection[];
}

export const FlexibleModels = ({ sections }: FlexibleModelsProps) => (
  <section className="py-20">
    <div className="px-4 md:px-10 lg:px-24 space-y-20">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          } gap-8 md:gap-16`}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src={section.image}
              alt={section.title}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl text-[#8123AD] font-semibold text-left">
              {section.title}
            </h3>
            <p className="text-[20px] text-left mb-6">{section.description}</p>

            {/* Conditional Content Rendering */}
            {section.points && section.points.length > 0 ? (
              <ul className="space-y-4 mt-6">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">
                      <svg
                        width="22"
                        height="19"
                        viewBox="0 0 22 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9573 0.714844C19.7863 0.714844 19.602 0.74651 19.4067 0.81651C13.7513 2.83584 9.00665 7.74184 6.92998 13.3628C5.70965 11.9108 4.22865 10.7242 2.40398 9.80384C2.14531 9.67384 1.89131 9.61618 1.65098 9.61618C0.198981 9.61618 -0.761019 11.7092 0.801648 12.4975C3.31832 13.7668 4.90998 15.4965 6.18365 17.9618C6.44465 18.4692 7.00432 18.7148 7.56298 18.7148C8.26232 18.7148 8.96265 18.3298 9.08398 17.5892C10.042 11.7388 14.47 5.88784 20.2503 3.82384C21.9653 3.21151 21.4736 0.714844 19.9573 0.714844Z"
                          fill="#0AC5AB"
                        />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-left">{section.paragraph}</p>
            )}

            {/* Conditionally render button only if buttonText exists */}
            {section.buttonText && (
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg">
                {section.buttonText}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);
