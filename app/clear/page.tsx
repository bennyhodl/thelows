"use client"
import Image from "next/image";
import { useUser } from "@/lib/useUser";
import UpsideDownPlaylist from "@/public/images/playlist-logo-slim.png"
import { clearStorage } from "@/lib/localStorage";

export default function Home() {
  useUser()
  return (
    <div className="flex flex-col items-center justify-around h-full md:max-w-lg m-auto">
      <UpsideDownPlaylistHero />
      <div className="flex flex-col justify-between items-center text-white text-center">
        <a className="btn w-3/4 underline pt-4 px-4 font-serif text-xl" onClick={() => clearStorage()}>Clear</a>
      </div>
    </div>
  );
}

const UpsideDownPlaylistHero = () => {
  return <Image src={UpsideDownPlaylist} alt="Upside Down Playlist" width={350} />
}