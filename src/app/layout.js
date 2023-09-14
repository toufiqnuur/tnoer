import "./globals.css";
import { Montserrat } from "next/font/google";

const monsterrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Toufiq.",
  description: "Personal web of Toufiq Nuur Rahman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={monsterrat.className}>{children}</body>
    </html>
  );
}
