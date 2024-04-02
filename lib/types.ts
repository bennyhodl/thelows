export type LowsSong = {
  name: string,
  id: string
}

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