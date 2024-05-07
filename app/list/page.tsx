"use client"
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cities, theLows } from "@/lib/types";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { getTopTen, saveTopTen } from "@/lib/localStorage"
import { ToggleSong } from "@/components/ToggleSong";

export default function List({ searchParams }: { searchParams: { city: Cities } }) {
  const [topTen, setTopTen] = useState<string[]>([])

  // top 5
  useEffect(() => {
    const songs = getTopTen([])
    setTopTen(songs)
  }, [])

  const userSelect = (list: string[]) => {
    setTopTen(list)
    saveTopTen(list)
  }

  return (
    <Suspense>
      <div className="md:max-w-lg m-auto font-serif text-xl">
        <Header center={false} city={searchParams.city} />
        <p className="text-black pt-20 pb-1 text-center px-4 font-bold">Select the songs that you want to hear on tour from the lows.</p>
        <ToggleGroup type="multiple" className="flex flex-col items-center m-auto justify-center w-11/12 mt-4" value={topTen} onValueChange={userSelect}>
          {theLows.map((song) => {
            // if (topTen.length === 9 && topTen.length < 10) {
            //   return (
            //     <ToggleGroupItem value={JSON.stringify(song)} key={song.id} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white border-gray-400 rounded-xl text-xl text-black font-bold my-1 h-16">
            //       <ToggleSong song={song} />
            //     </ToggleGroupItem>
            //   )

            // } else {
            return (
              <ToggleGroupItem value={JSON.stringify(song)} key={song.id} aria-label={`Toggle ${song}`} className="select-top w-full border-2 border-gray-400 data-[state=on]:bg-gray-800 data-[state=on]:text-white data-[state=on]:border-gray-500 rounded-none text-xl font-bold h-16 my-1">
                <ToggleSong song={song} />
              </ToggleGroupItem>
            )
            // }
          })}
        </ToggleGroup>
        <Footer full={false} />
      </div >
    </Suspense>
  );
}

