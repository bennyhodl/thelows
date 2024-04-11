import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = process.env.NODE_ENV === "production" ? "https://www.thelows.top" : "http://127.0.0.1:3000";
