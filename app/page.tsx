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
import { ChevronsUpDown } from "lucide-react"
import { cities } from "@/lib/types";
import { Header } from "@/components/Header";
import { VideoBackground } from "@/components/video-background";

export default function Home() {
  useUser()
  return (
    <>
      <div className="flex flex-col items-center justify-between h-screen md:max-w-lg m-auto">
        <div id="buttons" className="flex flex-col gap-4 text-center justify-center items-center pt-24">
          <UpsideDownPlaylistHero />
          <div className="flex flex-col gap-4 justify-center mt-8">
            <Link href="/list" legacyBehavior>
              <a className="btn w-full p-2 font-serif text-xl bg-white text-black border-2 border-white">Pick Your Playlist</a>
            </Link>
            <Link href="/playlist" legacyBehavior>
              <a className="btn w-full py-2 px-3 font-serif text-xl bg-transparent text-white border-2 border-white">See Results</a>
            </Link>
          </div>
        </div>
        <Footer full={false} white={true} />
      </div >
      <VideoBackground />
    </>
  );
}

const UpsideDownPlaylistHero = () => {
  return <Image src={UpsideDownPlaylist} alt="Upside Down Playlist" width={350} />
}

const PickCity = ({ city }: { city: string }) => {
  return (
    <div className="text-gray-800">
      <p>{city}</p>
    </div>
  )
}

const Dropdown = () => {
  const city = window.localStorage.getItem("city")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="flex flex-row justify-between items-center bg-white border-4 border-gray-400 px-4 py-2 font-serif text-xl"><p className="pr-2">{city ? city : "Pick your city"}</p><ChevronsUpDown className="text-black w-6 h-6 m-1" /></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-wrap bg-white text-black border-gray-400 w-64 text-center rounded-none">
        {cities.map((city, _) =>
        (
          <DropdownMenuItem key={city} className="text-center w-1/2 items-center justify-center">
            <Link href={`/list?city=${city}`} className="cursor-pointer text-md text-center my-1 font-serif text-md" onClick={() => window.localStorage.setItem("city", city)}>
              <div className="cursor-pointer text-md text-center my-1 font-serif text-md" /*onClick={() => { window.localStorage.setItem("city", city); setCity(city) }}*/>
                <PickCity city={city} />
              </div>
            </Link>
          </DropdownMenuItem>
        )
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
