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
    const leaderboard = await axios.get(`${API_URL}/api/leaderboard`)
    setLb(leaderboard.data)
  }
  useEffect(() => {
    getLeaderboard()
  }, [])
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gray-800 md:max-w-lg m-auto">
      <Header />
      <div className="relative w-full h-96 overflow-hidden">
        <h1 className="pt-14 text-white text-3xl text-center">Leaderboard</h1>
        {/* <Image src="/path/to/your/image.jpg" alt="Descriptive Alt Text" layout="fill" objectFit="cover" /> */}
        {/* <Image src={TheLows} alt="The Lows Album Cover" /> */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-800 to-transparent"></div>
        <h1 className="text-white">Total: {lb.total}</h1>
        {lb.songs && lb.songs.map(song => <SongBar song={song} />)}
      </div>
      <Footer />
    </div >
  );
}

const SongBar = ({ song }: { song: LeaderboardSong }) => {

  return (
    <p className="text-white">{song.name}: {song.points} {song.percent}</p>
  )
}