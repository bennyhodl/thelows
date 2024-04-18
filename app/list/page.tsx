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
import { getTopTen, saveTopTen } from "@/lib/localStorage"
import Link from "next/link";

export default function List({ searchParams }: { searchParams: { city: string } }) {
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

  const keepAlive = (song: string): boolean => {
    if (topTen.length < 10) return false
    return !topTen.includes(song)
  }

  return (
    <Suspense>
      <Drawer>
        <div className="bg-custom md:max-w-lg m-auto font-garamond-bold text-xl">
          <Header center={true} city={searchParams.city} />
          <p className="text-white pt-16 pb-1 text-center px-4 font-bold">Select 10 songs that you want to hear on tour from the lows. Then rank them.</p>
          <ToggleGroup type="multiple" className="flex flex-col items-center m-auto justify-center w-11/12 mt-4" value={topTen} onValueChange={userSelect}>
            {theLows.map(song => {
              if (topTen.length < 9 || topTen.length === 10) {
                return (
                  <ToggleGroupItem disabled={keepAlive(song)} value={song} key={song} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-gray-950 border-gray-800 rounded-xl text-xl text-white font-bold my-1 py-7">
                    <p className="w-full my-2">{song}</p>
                  </ToggleGroupItem>)

              } else {
                return (
                  <DrawerTrigger className="w-full">
                    <ToggleGroupItem disabled={keepAlive(song)} value={song} key={song} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-gray-950 border-gray-800 rounded-xl text-xl text-white font-bold my-1 py-7">
                      <p className="my-2">{song}</p>
                    </ToggleGroupItem>
                  </DrawerTrigger>
                )
              }
            })}
          </ToggleGroup>
          <Footer full={false} />
        </div >
        <DrawerContent className="bg-gray-950 border-gray-800 font-garamond">
          <DrawerHeader>
            <DrawerTitle className="text-white text-2xl">Is this the set list you want to hear?
            </DrawerTitle>
            <DrawerDescription className="text-lg">Click "Next" to rank the songs in order that you want performed.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Link href={`/list/order?city=${searchParams.city}`} legacyBehavior>
              <a className="btn rounded-lg w-full text-center text-white bg-[#f25201] py-3 px-4 mb-2">Next</a>
            </Link>
            <DrawerClose>
              <Button variant="outline" className="w-full">Go Back</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Suspense>
  );
}
