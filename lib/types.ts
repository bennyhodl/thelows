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

export const theLows: TheLows[] = [
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
  "bar hoppin",
  "dont think",
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