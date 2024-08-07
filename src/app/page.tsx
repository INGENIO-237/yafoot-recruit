"use client";

import Stats from "@/components/home/Stats";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiSealCheckFill } from "react-icons/pi";

export default function Home() {
  const joinRef = useRef(null);
  const joinIsInView = useInView(joinRef, { once: true });
  const steps = [
    "Remplissez le formulaire",
    "Payez vos frais de participation",
    "Soyez appelé pour passer les tests",
    "Soyez performant et soyez sélectionné",
  ];

  return (
    <main>
      {/* Hero */}
      <div className="container min-h-[90vh] md:min-h-[90vh] flex items-center">
        <div className="flex w-full flex-col items-center md:flex-row md:items-start md:justify-between pb-5">
          <div className="order-2 md:order-1 max-w-[500px] mt-10 md:mt-0">
            <div className="space-y-5 text-center md:text-left font-medium">
              <h1 className="text-3xl leading-[1] md:text-4xl lg:text-5xl">
                Devenez la{" "}
                <span className="text-secondary-hover font-bold">
                  prochaine icône
                </span>{" "}
                du football Camerounais
              </h1>
              <p className="text-white/60">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat laudantium nesciunt cum.
              </p>
            </div>

            <div className="mt-10 flex justify-center items-center md:justify-start">
              <Link href="/apply">
                <Button className="flex gap-3">
                  <span>Rejoignez-nous</span>
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
              src="/images/hero-image.png"
              width={600}
              height={600}
              priority
              alt="hero-image"
              className="pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <Stats />

      {/* How to join */}
      <div ref={joinRef} className="container mb-8">
        {joinIsInView && (
          <motion.div
            initial={{ translateX: "-10%", opacity: 0 }}
            animate={{
              translateX: "0%",
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            className="order-1 md:order-2 w-full flex flex-col md:flex-row justify-center md:justify-start md:gap-5"
          >
            <Image
              src="/images/join.png"
              width={600}
              height={600}
              priority
              alt="how-join"
              className="pointer-events-none"
            />
            <div className="md:flex md:items-center">
              <div className="text-left">
                <h1 className="text-3xl mt-5 md:mt-0 font-medium">
                  L&rsquo;ensemble du processus
                </h1>
                <div className="space-y-5 mt-8">
                  {steps.map((step, index) => {
                    return (
                      <p
                        key={index}
                        className="text-xl flex items-center gap-3"
                      >
                        <PiSealCheckFill className="text-secondary-hover" />{" "}
                        {step}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
