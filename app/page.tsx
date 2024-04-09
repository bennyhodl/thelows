"use client"
import Image from "next/image";
import TheLows from "@/public/images/the-lows.jpeg"
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useUser } from "@/lib/useUser";

export default function Home() {
  useUser()
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gray-950 md:max-w-lg m-auto">
      <div className="relative w-full h-96 overflow-hidden">
        <Image src={TheLows} alt="The Lows Album Cover" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </div>
      <div className="flex flex-col justify-between items-center pb-10 text-white text-center h-1/2">
        <div className="flex flex-col px-3">
          <h1 className="text-3xl pb-2">The Lows List</h1>
          <p className="">Rank your favorite songs from <i>THE LOWS</i> as you listen.</p>
          <br></br>
          <p className="pb-2">Submit your favorites and see how they rank compared to the rest of mike's listeners.</p>
        </div>
        <div className="flex flex-col w-3/4 items-center">
          <Link href="/album" legacyBehavior>
            <a className="btn rounded-3xl w-3/4 bg-orange-700 py-3 px-4">Create List</a>
          </Link>
          <Link href="/leaderboard" legacyBehavior>
            <a className="btn rounded-3xl w-3/4 underline py-3 px-4">Leaderboard</a>
          </Link>
        </div>
      </div>
      <Footer />
    </div >
  );
}
