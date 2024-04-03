"use client"
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components/Header";
import { API_URL } from "@/lib/utils";
import { LeaderBoardResponse, LeaderboardSong } from "@/lib/types";

export default function Home() {
  const [lb, setLb] = useState<LeaderBoardResponse>({ total: 0, songs: [] })
  const getLeaderboard = async () => {
    const leaderboard = await axios.get<LeaderBoardResponse>(`${API_URL}/api/leaderboard`)
    const sorted = leaderboard.data.songs.sort((a, b) => Number(b.percent) - Number(a.percent))
    setLb({ total: leaderboard.data.total, songs: sorted })
  }
  useEffect(() => {
    getLeaderboard()
  }, [])
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gray-800 md:max-w-lg m-auto">
      <Header />
      <div className="w-full overflow-hidden flex justify-center flex-col items-center text-white">
        <h1 className="pt-14 pb-6 text-3xl text-center">Leaderboard</h1>
        {/* <h1 className="text-white">Total: {lb.total}</h1> */}
        {lb.songs && lb.songs.map(song => <SongBar key={song.name} song={song} />)}
      </div>
      <Footer />
    </div >
  );
}

const SongBar = ({ song }: { song: LeaderboardSong }) => {
  return (
    <div className="w-full flex flex-col px-12">
      <p className="text-start">{song.name}</p>
      <div className="bg-gray-800 rounded-full h-6 my-1 flex flex-row justify-between">
        <div className="bg-orange-600 h-6 rounded-full" style={{ width: song.percent + "%" }}></div>
        <p>{song.percent}% ({song.points})</p>
      </div>
    </div>
  )
}