"use client";

import Stats from "@/components/home/Stats";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  return (
    <main>
      <div className="container">
        {/* Hero */}
        <div className="flex flex-col items-center md:flex-row md:items-start pb-5">
          <div className="order-2 md:order-1 max-w-[500px] mt-10 md:mt-0">
            <div className="space-y-5 text-center md:text-left font-medium">
              <h1 className="text-4xl">
                Become the{" "}
                <span className="text-y_red font-bold">next icon</span> of
                Cameroonian football
              </h1>
              <p className="text-white/60">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat laudantium nesciunt cum, perspiciatis sapiente rem!
                Eligendi voluptate aliquid corporis sapiente.
              </p>
            </div>

            <div className="mt-10 flex justify-center items-center md:justify-start">
              <Link href="/apply">
                <Button className="flex gap-3">
                  <span>Join us</span>
                  <motion.div
                    initial={{ translateX: "30%" }}
                    animate={{
                      translateX: "0%",
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeIn",
                      },
                    }}
                  >
                    <FaArrowRightLong />
                  </motion.div>
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ translateX: "-10%", opacity: 0 }}
            animate={{
              translateX: "0%",
              opacity: 1,
              transition: {
                delay: 1,
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            className="order-1 md:order-2 w-full flex justify-center"
          >
            <Image
              src="/images/foot-hero.png"
              width={450}
              height={450}
              priority
              alt="foot-hero"
              className="pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <Stats />
    </main>
  );
}
