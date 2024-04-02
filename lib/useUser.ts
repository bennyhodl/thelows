import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { getId, getSongList } from "./localStorage"
import { LowsSong } from "@/components/Song"

export const useUser = (): string => {
  const [id, setId] = useState<string>("")

  useEffect(() => {
    const user = getId()
    setId(user)
  }, [])

  return id
}