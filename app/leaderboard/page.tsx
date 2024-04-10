"use client"
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components/Header";
import { API_URL } from "@/lib/utils";
import { LeaderBoardResponse, LeaderboardSong, theLows } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [lb, setLb] = useState<LeaderBoardResponse>({ total: 0, songs: [] })
  const getLeaderboard = async () => {
    setLoading(true)
    const leaderboard = await axios.get<LeaderBoardResponse>(`${API_URL}/api/leaderboard`)
    const sorted = leaderboard.data.songs.sort((a, b) => Number(b.percent) - Number(a.percent))
    setLb({ total: leaderboard.data.total, songs: sorted })
    setLoading(false)
  }
  useEffect(() => {
    getLeaderboard()
  }, [])
  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen bg-gray-950 md:max-w-lg m-auto">
        <Header />
        <div className="w-full flex justify-center flex-col items-center text-white">
          <h1 className="pt-14 pb-6 text-3xl text-center">Leaderboard</h1>
          {loading && (
            theLows.map(s => (
              <div>
                <Skeleton className="h-5 w-80 rounded-md mb-1" />
                <Skeleton className="h-8 w-80 rounded-md mb-2" />
              </div>
            ))
          )}
          {lb.songs && !loading && lb.songs.map(song => <SongBar key={song.name} song={song} />)}
        </div>
        <Footer />
      </div >
    </>
  );
}

const SongBar = ({ song }: { song: LeaderboardSong }) => {
  return (
    <div className="w-80 flex flex-col">
      <p className="text-start">{song.name}</p>
      <div className="bg-gray-950 h-6 my-1 flex flex-row justify-between">
        <div className="bg-[#f25201] h-6 rounded-md" style={{ width: song.percent + "%" }}></div>
        <p>{song.percent}%</p>
      </div>
    </div>
  )
}
