import "@/styles/globals.css";
import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";
import type { AppProps } from "next/app";

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/gilroy/Gilroy-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${gilroy.variable} ${openSans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
