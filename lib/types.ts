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

export type SongDbEntry = {
  id: string,
  city: Cities,
  songs: SongScore[]
}

export type Cities = "boston" | "chicago" | "cleveland" | "denver" | "irving" | "minneapolis" | "nyc" | "pittsburgh" | "tampa" | "toronto" | "steve"

export const theLows: SongScore[] = [
  {album: "the lows.", name: "he said she said", id: "he-said-she-said", points: 0 },
  {album: "the lows.", name: "downtown", id: "downtown", points: 0 },
  {album: "the lows.", name: "up again", id: "up-again", points: 0 },
  {album: "the lows.", name: "backwoods", id: "backwoods", points: 0 },
  {album: "the lows.", name: "6am", id: "6am", points: 0 },
  {album: "the lows.", name: "sunfalls pm", id: "sunfalls-pm", points: 0 },
  {album: "the lows.", name: "swollen", id: "swollen", points: 0 },
  {album: "the lows.", name: "someone make it stop", id: "someone-make-it-stop", points: 0 },
  {album: "the lows.", name: "good day", id: "good-day", points: 0 },
  {album: "the lows.", name: "dive bar", id: "dive-bar", points: 0 },
  {album: "the lows.", name: "same guy", id: "same-guy", points: 0 },
  {album: "the lows.", name: "strawberry", id: "strawberry", points: 0 },
  {album: "the lows.", name: "same old me", id: "same-old-me", points: 0 },
  {album: "the lows.", name: "public", id: "public", points: 0 },
  {album: "the lows.", name: "another life", id: "another-life", points: 0 },
  {album: "the lows.", name: "p street", id: "p-street", points: 0 },
  {album: "the lows.", name: "skylight", id: "skylight", points: 0 },
  {album: "the lows.", name: "i remember everything", id: "i-remember-everything", points: 0 },
  {album: "the lows.", name: "head against the wall", id: "head-against-the-wall", points: 0 },
  {album: "the lows.", name: "coastin (night)", id: "coastin-night", points: 0 },
  {album: "the lows.", name: "matching tattoo", id: "matching-tattoo", points: 0 },
  {album: "the lows.", name: "woosah", id: "woosah", points: 0 },
  {album: "the lows.", name: "malibu breeze", id: "malibu-breeze", points: 0 },
  {album: "the lows.", name: "put me in the ground", id: "put-me-in-the-ground", points: 0 },
  {album: "the lows.", name: "everything but sorry", id: "everything-but-sorry", points: 0 },
  {album: "the lows.", name: "oasis", id: "oasis", points: 0 },
  {album: "the lows.", name: "tomorrows not a thing", id: "tomorrows-not-a-thing", points: 0 },
  {album: "the lows.", name: "when is when", id: "when-is-when", points: 0 },
  {album: "the lows.", name: "cuz i love you", id: "cuz-i-love-you", points: 0 },
  {album: "the lows.", name: "feel better", id: "feel-better", points: 0 },
  {album: "the lows.", name: "how many times", id: "how-many-times", points: 0 },
  {album: "the lows.", name: "fire and rain", id: "fire-and-rain", points: 0 },
  {album: "the lows.", name: "old again", id: "old-again", points: 0 },
  {album: "the lows.", name: "catalogue cabin", id: "catalogue-cabin", points: 0 },
  {album: "the lows.", name: "only god knows", id: "only-god-knows", points: 0}
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