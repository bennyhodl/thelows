import { useEffect, useState } from "react"
import { getId } from "./localStorage"

export const useUser = (): string => {
  const [id, setId] = useState<string>("")

  useEffect(() => {
    const user = getId()
    setId(user)
  }, [])

  return id
}