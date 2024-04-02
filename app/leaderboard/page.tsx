"use client"
import Image from "next/image";
import TheLows from "@/public/the-lows.jpeg"
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [lb, setLb] = useState({ total: 0 })
  const getLeaderboard = async () => {
    const leaderboard = await axios.get("http://127.0.0.1:3000/api/leaderboard")
    setLb(leaderboard.data)
  }
  useEffect(() => {
    getLeaderboard()
  }, [])
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gray-800 md:max-w-lg m-auto">
      <div className="relative w-full h-96 overflow-hidden">
        {/* <Image src="/path/to/your/image.jpg" alt="Descriptive Alt Text" layout="fill" objectFit="cover" /> */}
        <Image src={TheLows} alt="The Lows Album Cover" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-800 to-transparent"></div>
        <h1 className="text-white">Total: {lb.total}</h1>
      </div>
      <Footer />
    </div >
  );
}
