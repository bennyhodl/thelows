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

export default function Home() {
  useUser()
  return (
    <>
      <Header center={false} city={"steve"} />
      <div className="flex flex-col items-center justify-between h-screen md:max-w-lg m-auto pt-24">

        <div id="buttons" className="flex flex-col gap-4 text-center justify-center items-center">
          <UpsideDownPlaylistHero />
          <div className="flex flex-col gap-4 justify-center mt-8">
            <Link href="/list" legacyBehavior>
              <a className="btn w-full p-2 font-serif text-xl bg-black text-white border-2 border-black">Pick Your Playlist</a>
            </Link>
            <Link href="/playlist" legacyBehavior>
              <a className="btn w-full py-2 px-3 font-serif text-xl bg-transparent text-black border-2 border-black">See Results</a>
            </Link>
          </div>
        </div>
        {/* <Link href="/list/other-songs?city=steve" legacyBehavior>
          <a className="btn w-full p-2 font-serif text-xl bg-white text-black underline mb-6">All Songs</a>
        </Link> */}
        <Footer full={false} />
      </div >
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
