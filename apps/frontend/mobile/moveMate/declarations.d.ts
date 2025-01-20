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
