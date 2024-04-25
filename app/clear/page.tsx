"use client"
import Image from "next/image";
import Link from "next/link"
import { useUser } from "@/lib/useUser";
import UpsideDownPlaylist from "@/public/images/playlist-logo-slim.png"
import { clearStorage } from "@/lib/localStorage";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  useUser()
  const { toast } = useToast()
  return (
    <div className="flex flex-col items-center justify-around h-full md:max-w-lg m-auto">
      <Link href="/">
        <UpsideDownPlaylistHero />
        <p className="text-black underline text-3xl w-full text-center">Main Page</p>
      </Link>
      <div className="flex flex-col justify-between items-center text-black text-center">
        <a className="btn w-3/4 underline pt-4 px-4 font-serif text-xl" onClick={() => { clearStorage(); toast({ description: "Data cleared", duration: 1000 }) }}>Clear</a>
      </div>
    </div>
  );
}

const UpsideDownPlaylistHero = () => {
  return <Image src={UpsideDownPlaylist} alt="Upside Down Playlist" width={350} />
}