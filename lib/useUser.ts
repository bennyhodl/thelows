import { useEffect, useState } from "react"
import { getCity, getId } from "./localStorage"

export const useUser = (): [string, string] => {
  const [id, setId] = useState<string>("")
  const [city, setCity] = useState<string>("steve")

  useEffect(() => {
    const user = getId()
    const city = getCity()
    setId(user)
    setCity(city)
  }, [])

  return [id, city]
}