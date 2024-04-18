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
  city: Cities,
  total: number,
  songs: SongScore[]
}

export type OtherLeaderboardResponse = {
  city: Cities,
  total: number,
  songs: SongScore[]
}

export type SongScore = {
  album: string,
  name: string,
  id: string,
  points: number
}

export type SubmitListRequest = {
  city: Cities,
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

export const ynkSongs: SongScore[] = [
  { album: "the highs", name: "what i know", id: "what-i-know", points: 0 },
  { album: "the highs", name: "upside down", id: "upside-down", points: 0 },
  { album: "the highs", name: "life got crazy", id: "life-got-crazy", points: 0 },
  { album: "the highs", name: "like blood", id: "like-blood", points: 0},
  { album: "the highs", name: "2 birds", id: "2-birds", points: 0 },
  { album: "the highs", name: "real things", id: "real-things", points: 0 },
  { album: "the highs", name: "g.o.d", id: "g-o-d", points: 0 },
  { album: "the highs", name: "still-works", id: "still-works", points: 0 },
  { album: "the highs", name: "gang", id: "gang", points: 0 },
  { album: "the highs", name: "keep being you", id: "keep-being-you", points: 0 },
  { album: "the highs", name: "blue water", id: "blue-water", points: 0 },
  { album: "the highs", name: "bar hoppin'", id: "bar-hoppin'", points: 100 },
  { album: "the highs", name: "dont't think", id: "don't-think", points: 0 },
  { album: "the highs", name: "mountains", id: "mountains", points: 0 },
  { album: "the highs", name: "rodman", id: "rodman", points: 0 },
  { album: "the highs", name: "right now", id: "right-now", points: 0 },
  { album: "the highs", name: "ballgame", id: "ballgame", points: 0 },
  { album: "the highs", name: "on 10", id: "on-10", points: 0 },
  { album: "the highs", name: "deja u", id: "deja-u", points: 0 },
  { album: "the highs", name: "you can tell", id: "you-can-tell", points: 0 },
  { album: "the highs", name: "say something", id: "say-something", points: 0 },
  { album: "the highs", name: "boyfriend jeans", id: "boyfriend-jeans", points: 0 },
  { album: "the highs", name: "days go bye", id: "days-g-bye", points: 0 },

  { album: "love,", name: "white dress", id: "white-dress", points: 0},
  { album: "love,", name: "imagine", id: "imagine", points: 0},
  { album: "love,", name: "you showed me", id: "you-showed-me", points: 0},
  { album: "love,", name: "best man", id: "best-man", points: 0},
  { album: "love,", name: "you 2", id: "you-2", points: 0},

  { album: "been thinkin", name: "been-thinkin", id: "been-thinkin", points: 0},

  { album: "coastin", name: "coastin (wavy)", id: "coastin-wavy", points: 0},
  { album: "coastin", name: "coastin (day)", id: "coastin-day", points: 0},
  { album: "coastin", name: "coastin (night)", id: "coastin-night", points: 0},

  { album: "sunfalls", name: "sunfalls am", id: "sunfalls-am", points: 0},

  { album: "we die once", name: "we die once", id: "we-die-once", points: 0},

  { album: "alcohol", name: "alcohol", id: "alcohol", points: 0},

  { album: "long legs", name: "long legs", id: "long-legs", points: 0}
]