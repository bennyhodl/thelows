"use client"
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cities, songList } from "@/lib/types";
import { getTopTen, saveTopTen } from "@/lib/localStorage"
import { ToggleSong } from "@/components/ToggleSong";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { AlbumImage } from "@/components/AlbumImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";

export default function List({ searchParams }: { searchParams: { city: Cities } }) {
  const [topTen, setTopTen] = useState<string[]>([])

  // other songs
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
        <p className="text-black pt-20 pb-1 text-center px-4 font-bold">Select the songs that you want to hear on tour from the lows & the highs.</p>
        <ToggleGroup type="multiple" className="flex flex-col w-full px-4" value={topTen} onValueChange={userSelect}>
          <Separator className="text-gray-400 bg-gray-500 mt-2" />
          {songList.map(a => {
            return (
              <>
                <div className="flex flex-row items-center justify-between w-full mb-3 mt-4 px-2">
                  <div className="flex flex-col text-left">
                    <h4 className="text-3xl font-serif">{a[0].album}</h4>
                    <div className="flex flex-row text-xs text-gray-400 tex-xl">
                      <p className="">mike.</p>
                      <p className="px-1">•</p>
                      <p className="">{a[0].year}</p>
                    </div>
                  </div>
                  <AlbumImage album={a[0].album} />
                </div>
                <div className="w-full">
                  {
                    a.map(song => {
                      return (
                        <ToggleGroupItem value={JSON.stringify(song)} key={song.id} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-custom border-gray-400 data-[state=on]:bg-gray-800 data-[state=on]:text-white data-[state=off]:text-black data-[state=on]:border-gray-500 rounded-none text-xl font-bold py-7 my-1">
                          <ToggleSong song={song} />
                        </ToggleGroupItem>
                      )
                    })
                  }
                </div>
              </>
            )
          })}
        </ToggleGroup>
        {/* <Footer full={false} /> */}
      </div >
    </Suspense>
  );
}

