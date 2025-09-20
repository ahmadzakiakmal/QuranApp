import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Plus_Jakarta_Sans} from "next/font/google"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component className={plusJakartaSans.className} {...pageProps} />;
}
