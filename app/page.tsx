"use client"
import Image from "next/image";
import TheLows from "@/public/images/the-lows.jpeg"
import Link from "next/link";
import { useUser } from "@/lib/useUser";
import { Footer } from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UpsideDownPlaylist from "@/public/images/playlist-logo.png"
import { useState } from "react";
import { Cities } from "@/lib/types";
import { AudioLines, Building2, ChevronDown, ChevronsUpDown } from "lucide-react"

const cityList: Cities[] = [
  "tampa",
  "cleveland",
  "boston",
  "chicago",
  "denver",
  "irving",
  "minneapolis",
  "nyc",
  "pittsburgh",
  "toronto"
]

export default function Home() {
  useUser()
  return (
    <div className="flex flex-col items-center bg-custom md:max-w-lg m-auto">
      <UpsideDownPlaylistHero />
      <div className="flex flex-col justify-between items-center text-white text-center">
        <div className="px-6">
          <p className="font-garamond text-2xl">Pick the songs you want to hear on the <em className="font-garamond-italic">upside down tour.</em> when <em className="font-garamond-italic">mike.</em> comes to your city.</p>
        </div>
        <div className="flex flex-col w-3/4 items-center pt-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <div className="flex flex-row justify-between items-center rounded-lg bg-gray-950 border-4 border-gray-800 px-4 py-2"><p className="pr-2">Pick your city</p><ChevronsUpDown className="text-white w-6 h-6 m-1" /></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-950 text-white w-48 my-2">
              {cityList.map(city => <DropdownMenuItem><Link href={`/list?city=${city}`} className="cursor-pointer text-md text-center w-full my-1">{city}</Link></DropdownMenuItem>)}
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem><Link href="/list?city=every" className="cursor-pointer text-md text-center w-full my-1">No City</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/playlist" legacyBehavior>
            <a className="btn w-3/4 underline pt-4 px-4 font-bold">See Playlist</a>
          </Link>
        </div>
      </div>
      <Footer full={true} />
    </div >
  );
}

const UpsideDownPlaylistHero = () => {
  return <Image src={UpsideDownPlaylist} alt="Upside Down Playlist" width={350} />
}
