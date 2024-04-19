import Image from "next/image"
import TheLows from "@/public/images/the-lows.jpeg"
import TheHighs from "@/public/images/album/thehighs.png"
import Love from "@/public/images/album/love.png"
import BeenThinking from "@/public/images/album/been-thinking.png"
import Coastin from "@/public/images/album/coastin.png"
import Sunfalls from "@/public/images/album/sunfalls.png"
import Alcohol from "@/public/images/album/alcohol.webp"
import LongLegs from "@/public/images/album/long-legs.png"
import WeDieOnce from "@/public/images/album/we-die-once.png"

export const AlbumImage = ({ album, width, height }: { album: string, width?: number, height?: number }) => {
  switch (album) {
    case "love,":
      return <Image src={Love} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "the highs.":
      return <Image src={TheHighs} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "been thinking":
      return <Image src={BeenThinking} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "coastin":
      return <Image src={Coastin} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "sunfalls":
      return <Image src={Sunfalls} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "alcohol":
      return <Image src={Alcohol} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "we die once":
      return <Image src={WeDieOnce} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "long legs":
      return <Image src={LongLegs} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    default:
      return <Image src={TheLows} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
  }
}