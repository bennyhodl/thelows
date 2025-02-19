"use client"
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cities, SongScore, orderSongs, theLows } from "@/lib/types";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { getTopOtherSongs, saveTopOtherSongs } from "@/lib/localStorage"
import { AlbumImage } from "@/components/AlbumImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ToggleSong } from "@/components/ToggleSong";
import { Separator } from "@/components/ui/separator";

type OtherSong = {
  album: string,
  year: number,
  songs: string[]
}

export default function OtherSongs() {
  const [topOtherSongs, setTopOtherSongs] = useState<string[]>([])

  // other songs
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
      <div className=" md:max-w-lg m-auto" >
        <Header center={false} />
        <p className="text-black pt-16 pb-1 text-center px-8 font-serif text-xl font-bold">Pick from all songs you want to hear in concert.</p>
        <ToggleGroup type="multiple" className="flex mt-4" value={topOtherSongs} onValueChange={userSelect}>
          <Accordion type="multiple" className="w-full px-4">
            {orderSongs.map(a => {
              return (
                <AccordionItem value={a[0].id} key={a[0].id} className="border-none">
                  <AccordionTrigger className="text-black w-full py-0 my-2 hover:no-underline">
                    <div className="flex flex-row items-center">
                      <AlbumImage album={a[0].album} />
                      <div className="flex flex-col pl-4 text-left">
                        <h4 className="text-xl font-serif">{a[0].album}</h4>
                        <div className="flex flex-row text-xs text-gray-400">
                          <p className="">mike.</p>
                          <p className="px-1">•</p>
                          <p className="">{a[0].year}</p>
                        </div>

                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-black" key={crypto.randomUUID()}>
                    <Separator className="text-gray-400 bg-gray-500 mt-2 mb-3" />
                    {a.map(song => {
                      return (
                        <ToggleGroupItem value={JSON.stringify(song)} key={song.id} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-custom border-gray-400 data-[state=on]:bg-gray-800 data-[state=on]:text-white data-[state=off]:text-black data-[state=on]:border-gray-500 rounded-none text-xl font-bold py-7 my-1">
                          <ToggleSong song={song} />
                        </ToggleGroupItem>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>)
            })
            }
          </Accordion>
        </ToggleGroup>
        <Footer full={false} />
      </div>
    </Suspense>
  );
}


const vibes: OtherSong[] = [
  {
    album: "the highs.",
    year: 2021,
    songs: [
      "what i know",
      "upside down",
      "life got crazy",
      "like blood",
      "2 birds",
      "real things",
      "g.o.d",
      "still works",
      "gang",
      "keep being you",
      "blue water",
      "bar hoppin'",
      "don't think",
      "mountains",
      "rodman",
      "right now",
      "ballgame",
      "on 10",
      "deja u",
      "you can tell",
      "say something",
      "boyfriend jeans",
      "days go bye"
    ]
  },
  { album: "love,", year: 2023, songs: ["white dress", "imagine", "you showed me", "best man", "you 2"] },
  { album: "been thinking", year: 2020, songs: ["been thinking"] },
  { album: "coastin", year: 2024, songs: ["coastin (wavy)", "coastin day", "coastin (night)"] },
  { album: "sunfalls", year: 2024, songs: ["sunfalls am"] },
  { album: "we die once", year: 2023, songs: ["we die once"] },
  { album: "alcohol", year: 2024, songs: ["alcohol"] },
  { album: "long legs", year: 2023, songs: ["long legs"] }
]