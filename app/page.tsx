"use client"
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/lib/useUser";
import { Footer } from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UpsideDownPlaylist from "@/public/images/playlist-logo-slim.png"
import { Cities, orderSongs, ynkSongs } from "@/lib/types";
import { ChevronsUpDown } from "lucide-react"
import { ErrorBoundary } from "react-error-boundary"
const cityList: Cities[] = [
  "tampa",
  "cleveland",
  "boston",
  "chicago",
  "denver",
  "irving",
  "minneapolis",
  "nyc",
  "nyc (night 2)",
  "pittsburgh",
  "toronto",
  "toronto (night 2)"
]

export default function Home() {
  useUser()
  return (
    <div className="flex flex-col items-center bg-steve justify-start h-full md:max-w-lg m-auto pt-24">
      <UpsideDownPlaylistHero />
      <div className="flex flex-col justify-between items-center text-white text-center">
        {/* <div className="px-6"> */}
        {/* <p className="font-serif text-2xl mb-10">Pick the songs you want to hear on the <em className="font-serif-italic">upside down tour.</em> when <em className="font-serif-italic">mike.</em> comes to your city.</p> */}
        {/* </div> */}
        {/* <div className="flex flex-col w-3/4 items-center pt-8"> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex flex-row justify-between items-center rounded-lg bg-gray-950 border-4 border-gray-800 px-4 py-2 font-serif text-xl mt-16"><p className="pr-2">Pick your city</p><ChevronsUpDown className="text-white w-6 h-6 m-1" /></div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-wrap bg-gray-800 text-white border-gray-800 w-64 text-center">
            {cityList.map((city, i) =>
            (
              <DropdownMenuItem key={city} className="text-center w-1/2 items-center justify-center">
                <Link href={`/list?city=${city}`} className="cursor-pointer text-md text-center my-1 font-serif text-md" onClick={() => window.localStorage.setItem("city", city)}>
                  <PickCity city={city} />
                </Link>
              </DropdownMenuItem>
            )
            )}

          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/playlist?city=steve" legacyBehavior>
          <a className="btn w-full p-2 font-serif text-xl bg-[#02c7d4] mt-12 mb-6 rounded-lg">Go To Playlist</a>
        </Link>
        <Footer full={false} />
        {/* </div> */}
      </div>
    </div >
  );
}

const UpsideDownPlaylistHero = () => {
  return <Image src={UpsideDownPlaylist} alt="Upside Down Playlist" width={350} />
}

const PickCity = ({ city }: { city: string }) => {
  return (
    <div className="">
      <p>{city}</p>
    </div>
  )
}
