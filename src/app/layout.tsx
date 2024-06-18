import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/ui/PageTransition";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YAFOOT Recruit",
  description:
    "Football Club Yaoundé II, more commonly known as FC Yaoundé II or Yafoot, is a Cameroonian football club based in Yaoundé II. Founded in 1996, it plays in the Cameroon Football Championship.",
  icons: "<link rel='icon' href='/images/favicon-yafoot.png' sizes='any' />",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <PageTransition>
          <Header />
          {children}
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
