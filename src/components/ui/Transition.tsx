"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Transition() {
  const pathname = usePathname();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsExiting(false)
    const timeout = setTimeout(() => {
      setIsExiting(true);
    }, 3 * 1000 + 1000); // 3 repetitions * 2 seconds duration + 1 second delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  const variants = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: 1.3,
    },
    exit: {
      opacity: 0,
      transition: { duration: 1 }, // exit transition duration
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key={pathname}
          className="fixed inset-0 bg-y_black z-50 flex justify-center items-center"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 1,
            repeat: 2, // 3 repetitions (2 repeats + initial)
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/yafoot-club.png"
            width={150}
            height={150}
            alt="logo"
            className="pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
