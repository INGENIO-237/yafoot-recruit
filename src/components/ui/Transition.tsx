"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Transition() {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <div
          key={pathname}
          className="h-screen w-screen fixed top-0 bg-y_black z-index-90 flex justify-center items-center"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: 1.3,
              transition: {
                delay: 1,
                repeat: 3,
                duration: 2,
                ease: "easeInOut",
              },
            }}
            exit={{scale: [1.3, 1]}}
            className="relative"
          >
            <Image
              src="/images/yafoot-club.png"
              width={150}
              height={150}
              alt="logo"
              className="pointer-events-none"
            />
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}
