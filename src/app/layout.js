import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Ayesha Naveed - Portfolio",
  description: "Personal portfolio website showcasing web development projects, skills, and experience in React, Next.js, and modern web technologies.",
  keywords: "portfolio, web developer, react, nextjs, javascript, frontend developer",
  authors: [{ name: "Ayesha Naveed" }],
  openGraph: {
    title: "Ayesha Naveed - Portfolio",
    description: "Personal portfolio website showcasing web development projects and skills",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
