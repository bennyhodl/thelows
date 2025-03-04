"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/lib/useUser";
import UpsideDownPlaylist from "@/public/images/playlist-logo-slim.png";
import {
  Chart as ChartJS,
  BarElement,
  PieController,
  ArcElement,
  Title,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import useSwr from "swr";
import { API_URL, colors } from "@/lib/utils";
import { Cities, SongDbEntry, SongScore, cities, theLows } from "@/lib/types";
import axios from "axios";
// import { mockAdmin } from "@/lib/mocks";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  Title,
  LinearScale,
  Tooltip,
  Legend
);

const getAdminPage = async (): Promise<any> => {
  const response = await axios.get("/api/admin");
  const leaderboard: any = await response.data;

  return leaderboard;
};

const getVotes = async (): Promise<any> => {
  const response = await axios.get("/api/admin/per-city");
  const leaderboard: any = await response.data;
  return leaderboard;
};

export default function Home() {
  const {
    data: adminData,
    isLoading,
    error,
  } = useSwr<{ totalEntries: number; emails: number; votesPerCity: { _id: string, count: number }[] }>(
    `admin`,
    () => getAdminPage()
  );
  const { data: votes } = useSwr<
    { _id: Cities; songs: { name: string; totalPoints: number }[] }[]
  >(`votes`, () => getVotes());
  return (
    <div className="flex flex-col items-center justify-start h-full md:max-w-lg m-auto mt-16">
      <h1 className="text-2xl mb-6">Upside Down Playlist Admin</h1>
      <a
        href={`${API_URL}/api/admin/email`}
        download="upside.csv"
        className="py-2 px-4 bg-black text-white mb-4"
      >
        Download Emails
      </a>
      {adminData && (
        <h1>
          <strong>Total entries:</strong>{" "}
          {adminData.totalEntries.toLocaleString()}
        </h1>
      )}
      {adminData && (
        <h1>
          <strong>Total emails:</strong> {adminData.emails.toLocaleString()}
        </h1>
      )}
      {adminData && (
        <h1 className="mb-4">
          <strong>Email conversion (submitted & provided email): </strong>{" "}
          {Math.ceil((adminData.emails / adminData.totalEntries) * 100)}%
        </h1>
      )}
      <h2>Total entries per city</h2>
      {adminData &&
        adminData.votesPerCity.map((city) => {
          return (
            <h1>
              <strong>{city._id ?? "Total"}:</strong>{" "}
              {city.count.toLocaleString()}
            </h1>
          );
        })}
      {votes &&
        votes.map((city) => {
          return (
            <>
              <h1 className="bold text-3xl mt-16">{city._id}</h1>
              <SongsPerCity votes={city.songs} city={city._id} />
            </>
          );
        })}
    </div>
  );
}

const SongsPerCity = ({
  city,
  votes,
}: {
  city: Cities;
  votes: { name: string; totalPoints: number }[];
}) => {
  const options = {
    plugins: {
      title: {
        display: false,
        text: city,
      },
    },
  };

  const adminData = {
    labels: votes.map((v, i) => `${i + 1}. ${v.name}`),
    datasets: [
      {
        label: "Total Votes",
        data: votes.map((v) => v.totalPoints),
        backgroundColor: colors.map((c) => c),
      },
    ],
  };
  return <Pie options={options} data={adminData} />;
};
