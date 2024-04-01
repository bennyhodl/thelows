"use client"
import Image from "next/image";
import TheLows from "@/public/the-lows.jpeg"
import Link from "next/link";
import { useState } from "react";

let songs = ["real things", "rodman", "gang", "p street"]

export default function Home() {
  const [list, setSongs] = useState(songs)
  return (
    <div className="flex flex-col justify-between items-center h-full">
      <Image src={TheLows} alt="The Lows Album Cover" />
    </div >
  );
}
