import { Inter, Lusitana } from "next/font/google";
import localfont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export const myFont = localfont({
  src: "/fonts/apercu_regular.otf",
  display: "swap",
});
