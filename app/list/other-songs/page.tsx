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

type OtherSong = {
  album: string,
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
    { album: "love,", songs: ["white dress", "imagine", "you showed me", "best man", "you 2"] },
    { album: "been thinking", songs: ["been thinking"] },
    { album: "coastin", songs: ["coastin (wavy)", "coastin day", "coastin (night)"] },
    { album: "sunfalls", songs: ["sunfalls am"] },
    { album: "we die once", songs: ["we die once"] },
    { album: "alcohol", songs: ["alcohol"] },
    { album: "long legs", songs: ["long legs"] }
  ]

  return (
    <Suspense>
      <div className=" md:max-w-lg m-auto" >
        <Header center={false} city={searchParams.city} />
        <p className="text-white pt-16 pb-1 text-center px-4 font-garamond-bold text-xl">Pick as many songs as you want to hear at the concert.</p>
        <ToggleGroup type="multiple" className="flex mt-4" value={topOtherSongs} onValueChange={userSelect}>
          <Accordion type="multiple" className="w-full px-8">
            {vibes.map(album => {
              return (
                <AccordionItem value={album.album} key={album.album}>
                  <AccordionTrigger className="text-white w-full">
                    <div className="flex flex-row items-center">
                      <AlbumImage album={album.album} />
                      <h4 className="pl-4 text-xl font-garamond-bold">{album.album}</h4>
                    </div>
                  </AccordionTrigger>
                  {album.songs.map(song => {
                    const valueItem: SongScore = {
                      name: song,
                      album: album.album,
                      id: song.replaceAll(" ", "-").replaceAll(".", "-"),
                      points: 100
                    }
                    return (
                      <AccordionContent className="text-white" key={song}>
                        <ToggleGroupItem value={JSON.stringify(valueItem)} key={song} aria-label={`Toggle ${song}`} className="select-top w-full border-2 hover:text-white hover: border-gray-800 rounded-lg text-xl text-white font-bold py-7">
                          <p className="w-full">{song}</p>
                        </ToggleGroupItem>
                      </AccordionContent>
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
