import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.thelows.top"
    : "http://127.0.0.1:3000";

export const colors = [
  "#1A2B3C",
  "#4D5E6F",
  "#7890AB",
  "#CDEF12",
  "#345678",
  "#9ABCDF",
  "#012345",
  "#6789AB",
  "#BCDEF0",
  "#123456",
  "#789ABC",
  "#DE0123",
  "#456789",
  "#0ABCDE",
  "#123DEF",
  "#345ABC",
  "#678DEF",
  "#9AB123",
  "#CDE456",
  "#0F1234",
  "#56789A",
  "#BCDEF1",
  "#234567",
  "#89ABCD",
  "#EF0123",
  "#45678A",
  "#B0CDEF",
  "#123456",
  "#7ABCDF",
  "#012345",
  "#6890AB",
  "#BCDEF2",
  "#345678",
  "#9ABCDE",
  "#0F1234",
  "#56789B",
  "#CDEF01",
  "#234567",
  "#89ABCF",
  "#EF0124",
  "#45678B",
  "#A0CDEF",
  "#123457",
  "#7ABCDF",
  "#012346",
  "#6890AC",
  "#BCDEF3",
  "#345679",
  "#9ABCDF",
  "#0F1235",
  "#56789C",
  "#CDEF02",
  "#234568",
  "#89ABCE",
  "#EF0125",
  "#45678C",
  "#B0CDEF",
  "#52FF89",
  "#62DC78",
];
