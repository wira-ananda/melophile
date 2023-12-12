import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const jSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Melophile | Wiraa",
  description: "Music is a part of yourself",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jSans.className}>{children}</body>
    </html>
  );
}
