"use client";
import Image from "next/image";
import TheLowsImage from "@/public/images/the-lows.jpeg";
import { getSongList, getTopFive } from "@/lib/localStorage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/utils";
import { useUser } from "@/lib/useUser";
import { SongScore, SubmitListRequest, TheLows, theLows } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useCallback, useEffect, useState } from "react";

export const Header = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const id = useUser()

  const submitList = async (flavor: string) => {
    setLoading(true)
    let songs: TheLows[];
    let params;
    if (flavor === "album") {
      songs = getSongList(theLows)
      params = createQueryString("flavor", "album")
    } else {
      songs = getTopFive([])
      params = createQueryString("flavor", "top5")
    }
    // TODO feedback
    if (songs.length === 0) return;

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
      `${API_URL}/api/submit-list`,
      postList
    );

    router.push("/share" + "?" + params);
    setLoading(false)
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const HeaderButton = () => {
    switch (pathname) {
      case "/album":
        return (
          <Button
            className="btn bg-[#f25201] text-white py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => await submitList("album")}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        )
      case "/top5/order":
        return (
          <Button
            className="btn bg-[#f25201] text-white py-0 px-4 rounded-lg cursor-pointer font-bold"
            onClick={async () => await submitList("top5")}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        )
      case "/leaderboard":
        const leaderboard = { name: "Songs", path: "/album" }
        return (
          <Button
            className="btn bg-[#f25201] text-white py-0 px-4 rounded-xl cursor-pointer font-bold"
            onClick={() => { setLoading(true); router.push(leaderboard.path) }}
          >
            {leaderboard.name}
          </Button>
        )
      case "/top5":
        const topFive = { name: "Next", path: "/top5/order" }
        return (
          <Button
            className="btn bg-[#f25201] text-white py-0 px-4 rounded-xl cursor-pointer font-bold"
            onClick={() => {
              let topFiveSongs = getTopFive([])
              if (topFiveSongs.length !== 5) {
                return // modal
              }
              setLoading(true);
              router.push(topFive.path)
            }}
          >
            {topFive.name}
          </Button>
        )
      default:
        const path = { name: "Leaderboard", path: "/leaderboard" }
        return (
          <Button
            className="btn bg-[#f25201] text-white py-0 px-4 rounded-xl cursor-pointer font-bold"
            onClick={() => { setLoading(true); router.push(path.path) }}
          >
            {path.name}
          </Button>
        )
    }
  }

  return (
    <div className="h-14 bg-gray-950 fixed z-50 flex flex-row justify-between items-center w-full md:max-w-lg px-2 py-2">
      <Link href="/" legacyBehavior>
        <Image src={TheLowsImage} alt="The Lows Cover Art" className="cursor-pointer" width={40} height={40} />
      </Link>
      <HeaderButton />
    </div>
  );
};
