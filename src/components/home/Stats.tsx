"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

export default function Stats() {
  const now = new Date();
  const year = now.getFullYear();
  const stats = [
    { text: "Années d'existence", num: Number(year) - 1996 },
    { text: "Matchs joués", num: 300 },
    { text: "Trophées", num: 10 },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="w-full h-[150px] bg-secondary-hover my-5 flex items-center"
    >
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, ease: "easeIn" } }}
          className="container max-w-[700px] grid grid-cols-3 text-center"
        >
          {stats.map((stat, index) => {
            return (
              <div key={index} className="text-primary">
                {index == 1 ? (
                  <span className="text-4xl font-bold">
                    <CountUp end={stat.num} duration={3} />+
                  </span>
                ) : (
                  <CountUp
                    end={stat.num}
                    duration={3}
                    className="text-4xl font-bold"
                  />
                )}
                <p className="font-medium">{stat.text}</p>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
