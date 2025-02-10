declare module '*.png' {
  const content: number; // Use 'number' instead of 'string'
  export default content;
}

declare module '*.jpg' {
  const content: number;
  export default content;
}

declare module '*.jpeg' {
  const content: number;
  export default content;
}

declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default value;
}

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

