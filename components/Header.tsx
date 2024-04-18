"use client";
import Image from "next/image";
import TheLowsImage from "@/public/images/playlist-logo-slim.png";
import { getTopOtherSongs, getTopTen } from "@/lib/localStorage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/utils";
import { useUser } from "@/lib/useUser";
import { Cities, SongScore, SubmitListRequest, TheLows, theLows } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useCallback, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export const Header = ({ center, city }: { center: boolean, city: string }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  const pathname = usePathname();
  const id = useUser()

  const submitLowsList = async (city: string) => {
    setLoading(true)
    let songs: TheLows[] = getTopTen(theLows)

    let availablePoints = songs.length;
    const songsToSubmit = songs.map((song) => {
      const ranking: SongScore = {
        name: song,
        points: availablePoints,
      };

      availablePoints -= 1;
      return ranking;
    });

    const postList: SubmitListRequest = {
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
    let songs: TheLows[] = getTopOtherSongs(theLows)

    let availablePoints = songs.length;
    const songsToSubmit = songs.map((song) => {
      const ranking: SongScore = {
        name: song,
        points: availablePoints,
      };

      availablePoints -= 1;
      return ranking;
    });

    const postList: SubmitListRequest = {
      id,
      songs: songsToSubmit
    }

    await axios.post(
      `${API_URL}/api/submit-list/vibes?song=${city}`,
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
            className="btn bg-[#f25201] text-white font-garamond py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => await submitLowsList("album")} // City
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        )
      case "/list/other-songs":
        return (
          <Button
            className="btn bg-[#f25201] text-white font-garamond py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => await submitOtherSongsList("tampa")} // City
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        )
      case "/list/order":
        return (
          <Button
            className="btn bg-[#f25201] text-white font-garamond py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => await submitLowsList("top10")}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            <DrawerTrigger className="w-full">
              Submit
            </DrawerTrigger>
          </Button>
        )

      default:
        return <></>
    }
  }

  const classes = !center ? "h-14 bg-custom fixed z-50 flex flex-row justify-between items-center w-full md:max-w-lg px-2 py-2" : "h-14 bg-custom fixed z-50 flex justify-center w-full md:max-w-lg px-2 py-2"
  return (
    <Drawer>
      <div className={classes}>
        <Link href="/" legacyBehavior>
          <Image src={TheLowsImage} alt="The Lows Cover Art" className="cursor-pointer" width={90} height={35} />
        </Link>
        <HeaderButton />
        <DrawerContent className="bg-gray-950 border-gray-800">
          <DrawerHeader>
            <DrawerTitle className="text-white"><p className="font-garamond-bold text-2xl">Would you like to pick songs from previous albums?</p></DrawerTitle>
            <DrawerDescription><p className="font-garamond-bold text-xl">To see the playlist, click "Continue".</p></DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Link href={`/list/other-songs?city=${city}`} legacyBehavior>
              <a className="btn rounded-lg w-full text-center text-white bg-[#f25201] py-3 px-4 mb-1 font-garamond-bold font-3xl"><p>Yes</p></a>
            </Link>
            <Link href={`/playlist?city=${city}`} legacyBehavior>
              <a className="btn rounded-lg w-full text-center text-black bg-white py-3 px-4 mb-3 font-garamond">Continue</a>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  );
};

// case "/leaderboard":
// const leaderboard = { name: "The Lows", path: "/" }
// return (
//   <Button
//     className="btn bg-[#f25201] text-white py-0 px-4 rounded-xl cursor-pointer font-bold"
//     onClick={() => { setLoading(true); router.push(leaderboard.path) }}
//   >
//     {leaderboard.name}
//   </Button>
// )
//       case "/top5":
// const topFive = { name: "Next", path: "/top5/order" }
// return (
//   <Button
//     className="btn bg-[#f25201] text-white py-0 px-4 rounded-xl cursor-pointer font-bold"
//     onClick={() => {
//       let topFiveSongs = getTopFive([])
//       if (topFiveSongs.length !== 5) {
//         return // modal
//       }
//       setLoading(true);
//       router.push(topFive.path)
//     }}
//   >
//     {topFive.name}
//   </Button>
// )