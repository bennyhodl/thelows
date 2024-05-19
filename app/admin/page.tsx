"use client"
import Image from "next/image";
import Link from "next/link"
import { useUser } from "@/lib/useUser";
import UpsideDownPlaylist from "@/public/images/playlist-logo-slim.png"
import { Chart as ChartJS, BarElement, Title, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import useSwr from "swr";
import { API_URL } from "@/lib/utils";
import { Cities, SongDbEntry, SongScore, cities, theLows } from "@/lib/types";
import { mockAdmin } from "@/lib/mocks";

ChartJS.register(BarElement, CategoryScale, Title, LinearScale, Tooltip, Legend)

const getAdminPage = async (): Promise<any> => {
  const response = await fetch(`${API_URL}/api/admin`, { cache: "no-cache" })
  const leaderboard: any = await response.json()

  return leaderboard
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    },
    title: {
      display: true,
      text: "Upside Down Playlist"
    }
  }
}

export default function Home() {
  const { data: count, isLoading, error } = useSwr<{ totalEntries: number }>(`admin`, () => getAdminPage())
  return (
    <div className="flex flex-col items-center justify-around h-full md:max-w-lg m-auto">
      <h1 className="text-2xl">Upside Down Playlist Admin</h1>
      {count && <h1>{count.totalEntries}</h1>}
      {/* {admin && cities.map(city => {
        const songs = admin.filter(s => s.city === city)
        return <SongsPerCity votes={songs} city={city} />
      })} */}
    </div>
  );
}

// const SongsPerCity = ({ city, votes }: { city: Cities, votes: { id: string, city: string, songs: SongScore[] }[] }) => {
//   let songs: any = {}
//   theLows.forEach(l => {
//     songs[l.name] = 0
//     votes.forEach(s => {
//       s.songs.forEach(i => {
//         if (i.name === l.name) {
//           songs[l.name] += i.points
//         }
//       })
//     })
//   })

//   const options = {
//     plugins: {
//       title: {
//         display: true,
//         text: city
//       }
//     }
//   }

//   const adminData = {
//     labels: ["cleveland"],
//     datasets: [78, 89, 67, 30]
//   }
//   return <Bar options={options} data={adminData} />
// }