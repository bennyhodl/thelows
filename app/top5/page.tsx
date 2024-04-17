"use client"
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { theLows } from "@/lib/types";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { getTopFive, saveTopFive } from "@/lib/localStorage"

export default function Album() {
  const [topFive, setTopFive] = useState<string[]>([])

  // top 5
  useEffect(() => {
    const songs = getTopFive([])
    setTopFive(songs)
  }, [])

  const userSelect = (list: string[]) => {
    setTopFive(list)
    saveTopFive(list)
  }

  const keepAlive = (song: string): boolean => {
    if (topFive.length < 5) return false
    return !topFive.includes(song)
  }

  return (
    <Suspense>
      <div className="bg-gray-950 md:max-w-lg m-auto" >
        <Header />
        <p className="text-white pt-16 pb-1 text-center px-4 font-bold">Select your top 5 songs and then click "Next" to order them.</p>
        <ToggleGroup type="multiple" className="flex flex-col items-center m-auto justify-center w-11/12 mt-4" value={topFive} onValueChange={userSelect}>
          {theLows.map(song => (
            <ToggleGroupItem disabled={keepAlive(song)} value={song} key={song} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-gray-950 border-gray-800 rounded-xl text-xl text-white font-bold my-1 py-7">
              <p className="w-full my-2">{song}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Footer />
      </div >
    </Suspense>
  );
}
