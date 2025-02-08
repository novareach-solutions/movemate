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
  <section className="relative min-h-screen flex flex- justify-center  items-center">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" />
    </div>

    <div className="container relative grid md:grid-cols-2 items-center gap-[400px]">
      <div className="text-white space-y-6">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="text-xl">{description}</p>
        <button className="bg-purple-600 text-white px-8 py-3 rounded-lg">
          {buttonText}
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
        <p className="text-gray-600 mb-6">{formDescription}</p>
        <form className="space-y-4">
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
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  </section>
);
