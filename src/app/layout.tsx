import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Poppins } from "next/font/google";
import "../styles/main.scss";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  variable: "--font-playfair",
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | plantique",
    default: "plantique",
  },
  description: "A daily inspiration for delicious vegan meals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
