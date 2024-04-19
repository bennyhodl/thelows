"use client"
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cities, SongScore, theLows } from "@/lib/types";
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
import { getTopTen, saveTopTen } from "@/lib/localStorage"
import Link from "next/link";
import { AlbumImage } from "@/components/AlbumImage";
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

  // const keepAlive = (song: string): boolean => {
  //   if (topTen.length < 10) return false
  //   topTen.forEach(s => {
  //     if (s.name === song) return true
  //   })
  //   return false
  // }

  return (
    <Suspense>
      {/* <Drawer> */}
      <div className="  md:max-w-lg m-auto font-serif text-xl">
        <Header center={false} city={searchParams.city} />
        <p className="text-white pt-20 pb-1 text-center px-4 font-bold">Select the songs that you want to hear on tour from the lows.</p>
        <ToggleGroup type="multiple" className="flex flex-col items-center m-auto justify-center w-11/12 mt-4" value={topTen} onValueChange={userSelect}>
          {theLows.map((song) => {
            if (topTen.length === 9 && topTen.length < 10) {
              return (
                <ToggleGroupItem /*disabled={keepAlive(song.name)}*/ value={JSON.stringify(song)} key={song.id} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-gray-950 border-gray-800 rounded-xl text-xl text-white font-bold my-1 h-16">
                  {/* <DrawerTrigger className="w-full m-0 p-0" key={song.id}> */}
                  <ToggleSong song={song} />
                  {/* </DrawerTrigger> */}
                </ToggleGroupItem>
              )

            } else {
              return (
                <ToggleGroupItem /*disabled={keepAlive(song.name)}*/ value={JSON.stringify(song)} key={song.id} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-gray-950 border-gray-800 rounded-xl text-xl text-white font-bold h-16 my-1">
                  <ToggleSong song={song} />
                </ToggleGroupItem>
              )
            }
          })}
        </ToggleGroup>
        <Footer full={false} />
      </div >
      {/* <DrawerContent className="bg-gray-950 border-gray-800 font-serif">
          <DrawerHeader>
            <DrawerTitle className="text-white text-2xl">Is this the set list you want to hear?
            </DrawerTitle>
            <DrawerDescription className="text-lg">Click "Continue" to rank the songs in order that you want performed.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Link href={`/list/order?city=${searchParams.city}`} legacyBehavior>
              <a className="btn rounded-lg w-full text-center text-gray-950 bg-[#02c7d4] py-3 px-4 mb-2">Continue</a>
            </Link>
            <DrawerClose>
              <Button variant="outline" className="w-full">Pick Again</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </Suspense>
  );
}

