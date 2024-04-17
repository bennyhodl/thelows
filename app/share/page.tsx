"use server"
import { Footer } from "@/components/Footer"
import { Suspense, useEffect, useState } from "react"
import { TheLows } from "@/lib/types"
import { getSongList, getTopFive } from "@/lib/localStorage"
import { Header } from "@/components/Header"
import { Share as ShareIcon } from "lucide-react"
import Link from "next/link"
import { API_URL } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "next/navigation"
import { ShareableImage } from "@/components/ShareImage"

export default async function Share({ searchParams }: {
  searchParams: { flavor: string | undefined }
}) {
  return (
    <Suspense fallback={<p>heyhowareya</p>}>
      <div className="flex flex-col justify-between items-center h-screen bg-gray-950 md:max-w-lg mx-auto">
        <Header />
        <div className="w-full flex flex-col justify-center items-center mt-16 px-4">
          <ShareableImage flavor={searchParams.flavor} />
          <p className="text-3xl mb-3 text-white pt-2 font-bold">Share your list!</p>
          <div className="flex flex-col justify-around items-center text-white text-center h-1/2 pb-2 text-lg font-bold">
            <p>1. Press & hold to save image.</p>
            <p className="flex flex-row">2. Press the share icon (<ShareIcon width={20} height={20} className="mx-2" />).</p>
            <p>3. Share to Instagram.</p>
            <p>3. Post to your story and tag @onlysteves & @justmike</p>
          </div>
          <Link href="/leaderboard" legacyBehavior>
            <a className="btn rounded-3xl w-3/4 bg-[#f25201] py-3 my-4 px-4 text-white text-center font-bold">The Lows Song Leaderboard</a>
          </Link>
        </div >
        <Footer />
      </div >
    </Suspense>
  )
}