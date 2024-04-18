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
import { Button } from "@/components/ui/button";
import { getTopOtherSongs, getTopTen, saveTopOtherSongs, saveTopTen } from "@/lib/localStorage"
import Link from "next/link";

export default function OtherSongs({ searchParams }: { searchParams: { city: string } }) {
  const [topOtherSongs, setTopOtherSongs] = useState<string[]>([])

  // top 5
  useEffect(() => {
    const songs = getTopOtherSongs([])
    setTopOtherSongs(songs)
  }, [])

  const userSelect = (list: string[]) => {
    setTopOtherSongs(list)
    saveTopOtherSongs(list)
  }

  return (
    <Suspense>
      <div className="bg-custom md:max-w-lg m-auto" >
        <Header center={false} city={searchParams.city} />
        <p className="text-white pt-16 pb-1 text-center px-4 font-bold">Select 10 songs that you want to hear on tour from the lows. Then rank them.</p>
        <ToggleGroup type="multiple" className="flex flex-col items-center m-auto justify-center w-11/12 mt-4" value={topOtherSongs} onValueChange={userSelect}>
          {theLows.map(song =>
            <ToggleGroupItem value={song} key={song} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-custom border-gray-800 rounded-lg text-xl text-white font-bold my-1 py-7">
              <p className="w-full my-2">{song}</p>
            </ToggleGroupItem>
          )}
        </ToggleGroup>
        <Footer full={false} />
      </div>
    </Suspense>
  );
}
