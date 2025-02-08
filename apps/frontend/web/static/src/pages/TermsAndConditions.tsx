import React from "react";
import TermsAndConditions from "./TermsAndConditions";

const termsContent = [
  {
    title: "For Users",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu odio in dolor ornare lacinia. Quisque eros tortor, rhoncus nec nisi finibus, egestas gravida elit. Vestibulum feugiat, sem quis dignissim tempus, massa turpis tristique arcu, sit amet accumsan magna sapien venenatis est. Donec condimentum dolor non sagittis bibendum. Vestibulum et est faucibus, pellentesque enim non, vulputate libero. Maecenas et odio lorem.",
      "Phasellus pulvinar viverra odio, et tempus velit blandit eu. Nunc vitae feugiat ligula, in malesuada nisi. Nunc id accumsan sem. Vivamus at dolor nec diam porta sodales. Maecenas quis feugiat est. Curabitur ornare orci eu leo facilisis, in gravida lectus lobortis. Praesent euismod varius magna eu ultricies. Sed mollis nunc nec nibh molestie cursus.",
      "Quisque ultricies ut augue at ultricies. In posuere id odio ut pharetra. Sed at sollicitudin dui, sed tempus quam. Nunc nec massa feugiat, pulvinar tellus ac, ultricies lectus. Mauris accumsan urna non nisi malesuada ultrices. Quisque consequat felis nec tempor aliquet. Donec volutpat faucibus risus. Aliquam in mi vestibulum, laoreet dolor eu, dapibus neque.",
      "Praesent tincidunt tincidunt metus, quis convallis ligula lobortis sed. Praesent a accumsan orci. Nam pretium feugiat lectus at consequat. Vestibulum imperdiet sem in mi scelerisque faucibus. Etiam auctor consequat felis et ullamcorper. Proin a orci sed augue convallis varius. Pellentesque volutpat rutrum libero egestas tincidunt. Quisque condimentum iaculis nibh eget dapibus. Aliquam iaculis dignissim tellus, a placerat massa malesuada vel. Ut tincidunt congue orci, a maximus nunc volutpat eget. Pellentesque pulvinar aliquam feugiat. Integer sed iaculis mauris. Quisque mollis a sem sed dapibus.",
    ],
  },
];

const App: React.FC = () => {
  return (
    <div>
      <TermsAndConditions sections={termsContent} />
    </div>
  );
};

export default App;
