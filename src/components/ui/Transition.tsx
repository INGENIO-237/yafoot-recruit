"use client";

import { AnimatePresence } from "framer-motion";

export default function Transition() {
  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-full pointer-events-none flex justify-center items-center bg-y_yellow">
            <div>
        <h1 className="text-white">Transition</h1>

            </div>
      </div>
    </AnimatePresence>
  );
}
