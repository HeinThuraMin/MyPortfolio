import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Hein Thura Min | Portfolio",
  description:
    "Hein Thura Min — Computer Science student, Junior Data Engineer and full-stack developer based in Singapore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rubik.variable}>
      <body className="relative">{children}</body>
    </html>
  );
}
