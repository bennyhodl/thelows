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

export default function OtherSongs({ searchParams }: { searchParams: { city: Cities } }) {
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

  return (
    <Suspense>
      <div className=" md:max-w-lg m-auto" >
        <Header center={false} city={searchParams.city} />
        <p className="text-white pt-16 pb-1 text-center px-4 font-serif text-xl">Pick as many songs as you want to hear at the concert.</p>
        <ToggleGroup type="multiple" className="flex mt-4" value={topOtherSongs} onValueChange={userSelect}>
          <Accordion type="multiple" className="w-full px-8">
            {vibes.map(album => {
              return (
                <AccordionItem value={album.album} key={album.album} className="border-none">
                  <AccordionTrigger className="text-white w-full py-0 my-2 hover:no-underline">
                    <div className="flex flex-row items-center">
                      <AlbumImage album={album.album} />
                      <div className="flex flex-col pl-4 text-left">
                        <h4 className="text-xl font-serif">{album.album}</h4>
                        <div className="flex flex-row text-xs text-gray-400">
                          <p className="">mike.</p>
                          <p className="px-1">•</p>
                          <p className="">{album.year}</p>
                        </div>

                      </div>
                    </div>
                  </AccordionTrigger>
                  {album.songs.map((song, i) => {
                    const valueItem: SongScore = {
                      name: song,
                      album: album.album,
                      id: song.replaceAll(" ", "-").replaceAll(".", "-"),
                      points: 100
                    }
                    
                    return (
                      <>
                      <AccordionContent className="text-white" key={song}>
                        {i === 0 && <Separator className="text-gray-400 bg-gray-500 mt-2 mb-3"/>}
                        <ToggleGroupItem value={JSON.stringify(valueItem)} key={song} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover:bg-custom hover: border-gray-800 rounded-lg text-xl text-white font-bold py-7">
                          {/* <p className="w-full">{song}</p> */}
                          <ToggleSong song={valueItem} />
                        </ToggleGroupItem>
                      </AccordionContent>
                      </>
                    )
                  })}
                </AccordionItem>)
            })}
          </Accordion>
        </ToggleGroup>
        <Footer full={false} />
      </div>
    </Suspense>
  );
}
