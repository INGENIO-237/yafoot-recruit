import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  let buffer = new Date(date);

  return buffer.toLocaleDateString("en-CM", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
