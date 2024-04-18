export type LowsSong = {
  name: string,
  id: string
}

export type TheLows = string

export type LeaderboardSong = {
  name: string,
  points: number,
  percent: string,
}

export type LeaderBoardResponse = {
  total: number,
  songs: LeaderboardSong[]
}

export type SongScore = {
  name: string,
  points: number
}

export type SubmitListRequest = {
  id: string,
  songs: SongScore[]
}

export type ShareImageRequest = {
  songs: TheLows[]
}

export type Cities = "boston" | "chicago" | "cleveland" | "denver" | "irving" | "minneapolis" | "nyc" | "pittsburgh" | "tampa" | "toronto" | "steve"

export const theLows: TheLows[] = [
  "he said she said",
  "downtown",
  "up again",
  "backwoods",
  "6am",
  "sunfalls pm",
  "swollen",
  "someone make it stop",
  "good day",
  "dive bar",
  "same guy",
  "strawberry",
  "same old me",
  "public",
  "another life",
  "p street",
  "skylight",
  "i remember everything",
  "head against the wall",
  "coastin (night)",
  "matching tattoo",
  "woosah",
  "malibu breeze",
  "put me in the ground",
  "everything but sorry",
  "oasis",
  "tomorrows not a thing",
  "when is when",
  "cuz i love you",
  "feel better",
  "how many times",
  "fire and rain",
  "old again",
  "catalogue cabin",
  "only god knows"
]