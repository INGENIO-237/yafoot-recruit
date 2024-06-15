"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowDownLong } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="container">
      {/* Hero */}
      <div className="flex flex-col items-center lg:flex-row lg:items-start">
        <div className="order-2 lg:order-1 max-w-[500px] mt-10 lg:mt-0">
          <div className="space-y-5">
            <h1 className="text-4xl">
              Become the{" "}
              <span className="text-y_red font-extrabold">next icon</span> of
              Cameroonian football
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              laudantium nesciunt cum, perspiciatis sapiente rem! Eligendi
              voluptate aliquid corporis sapiente.
            </p>
          </div>

          <motion.div>
            <FaArrowDownLong className="mt-28" />
          </motion.div>
        </div>
        <motion.div
          initial={{ translateX: "-30%", opacity: 0 }}
          animate={{
            translateX: "0%",
            opacity: 1,
            transition: {
              delay: 1,
              duration: 0.4,
              ease: "linear",
            },
          }}
          className="order-1 lg:order-2 w-full flex justify-center"
        >
          <Image
            src="/images/foot-hero.png"
            width={500}
            height={500}
            priority
            alt="foot-hero"
            className="pointer-events-none"
          />
        </motion.div>
      </div>
    </main>
  );
}
