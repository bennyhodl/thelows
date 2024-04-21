"use client";
import Image from "next/image";
import TheLowsImage from "@/public/images/playlist-logo-slim.png";
import { getTopOtherSongs, getTopTen } from "@/lib/localStorage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/utils";
import { useUser } from "@/lib/useUser";
import { Cities, SongScore, SubmitListRequest } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export const Header = ({ center, city }: { center: boolean, city: Cities }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const pathname = usePathname();
  const router = useRouter()
  const id = useUser()

  const submitLowsList = async (city: Cities) => {
    setLoading(true)
    let songs: string[] = getTopTen([])

    let availablePoints = songs.length;
    const songsToSubmit = songs.map(s => {
      const song = JSON.parse(s)
      const ranking: SongScore = {
        name: song.name,
        id: song.id,
        album: song.album,
        points: availablePoints,
      };

      availablePoints -= 1;
      return ranking;
    });

    const postList: SubmitListRequest = {
      city,
      id,
      songs: songsToSubmit
    }

    await axios.post(
      `${API_URL}/api/submit-list?city=${city}`,
      postList
    );

    setLoading(false)
  };

  const submitOtherSongsList = async (city: Cities) => {
    setLoading(true)
    let list: string[] = getTopOtherSongs([])
    let songs = list.map(s => JSON.parse(s))

    const postList: SubmitListRequest = {
      city,
      id,
      songs
    }

    await axios.post(
      `${API_URL}/api/submit-list/other?city=${city}`,
      postList
    );

    // city
    router.push("/playlist?city=" + city);
    setLoading(false)
  };

  const HeaderButton = () => {
    switch (pathname) {
      case "/album":
        return (
          <Button
            className="btn bg-[#02c7d4] text-white font-serif py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => await submitLowsList(city)} // City
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        )
      case "/list/other-songs":
        return (
          <Button
            className="btn bg-[#02c7d4] text-white font-serif py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => await submitOtherSongsList(city)} // City
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        )
      case "/list/order":
        return (
          <Button
            className="btn bg-[#02c7d4] text-white font-serif py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => await submitLowsList(city)}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            <DrawerTrigger className="w-full">
              Submit
            </DrawerTrigger>
          </Button>
        )
      case "/list":
        return (
          <Button
            className="btn bg-[#02c7d4] text-white font-serif py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => router.push(`/list/order?city=${city}`)}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        )

      default:
        return <></>
    }
  }

  const classes = !center ? "h-14 bg-custom fixed flex flex-row justify-between items-center w-full md:max-w-lg px-2 py-2" : "h-14 bg-custom fixed flex justify-center w-full md:max-w-lg px-2 py-2"
  return (
    <Drawer>
      <div className={classes}>
        <Link href="/" legacyBehavior>
          <Image src={TheLowsImage} alt="The Lows Cover Art" className="cursor-pointer" width={85} height={35} />
        </Link>
        <HeaderButton />
        <DrawerContent className="bg-gray-950 border-gray-800">
          <DrawerHeader>
            <DrawerTitle className="text-white"><p className="font-serif text-2xl">Would you like to pick songs from previous albums?</p></DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Link href={`/list/other-songs?city=${city}`} legacyBehavior>
              <a className="btn rounded-lg w-full text-center text-gray-950 bg-[#02c7d4] text-white py-3 px-4 mb-1 font-serif font-3xl"><p>Pick From All Songs</p></a>
            </Link>
            <Link href={`/playlist?city=${city}`} legacyBehavior>
              <a className="btn rounded-lg w-full text-center text-black bg-white py-3 px-4 mb-3 bg-[#9CA3AF] font-serif">Go To the Upside Down Playlist</a>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  );
};
