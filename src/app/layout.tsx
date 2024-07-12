"use client";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/ui/PageTransition";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transition from "@/components/ui/Transition";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const dmSans = DM_Sans({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "YAFOOT Recruit",
//   description:
//     "Football Club Yaoundé II, more commonly known as FC Yaoundé II or Yafoot, is a Cameroonian football club based in Yaoundé II. Founded in 1996, it plays in the Cameroon Football Championship.",
//   icons: "<link rel='icon' href='/images/favicon-yafoot.png' sizes='any' />",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <html lang="en">
      <head>
        <title>YAFOOT Recruit</title>
        <meta
          name="description"
          content="Football Club Yaoundé II, more commonly known as FC Yaoundé II or Yafoot, is a Cameroonian football club based in Yaoundé II. Founded in 1996, it plays in the Cameroon Football Championship."
        />
        <link
          rel="shortcut icon"
          href="/images/favicon-yafoot.png"
          type="image/x-icon"
        />
        <base href="/" />
      </head>
      <body className={dmSans.className}>
        <QueryClientProvider client={queryClient}>
          <PageTransition>
            {/* <Transition /> */}
            <Header />
            {children}
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar
            />
            <Footer />
          </PageTransition>
        </QueryClientProvider>
      </body>
    </html>
  );
}
