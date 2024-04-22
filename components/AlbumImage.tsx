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
import Smiley from "@/public/images/smileys-big.png"

import ActRight from "@/public/images/album/act-right.png"
import Bride from "@/public/images/album/bride.png"
import Four from "@/public/images/album/four.png"
import TheseDays from "@/public/images/album/these-days.png"
import Why from "@/public/images/album/why.png"
import Swish from "@/public/images/album/these-days.png"

import Fly from "@/public/images/album/fly.png"
import Commas from "@/public/images/album/commas.png"
import InOut from "@/public/images/album/in.png"
import NoParty from "@/public/images/album/noparty.png"
import UhYuh from "@/public/images/album/uhyuh.png"
import Sorry from "@/public/images/album/sorry.png"
import Time from "@/public/images/album/time.png"
import Sick from "@/public/images/album/sick.png"
import Boat from "@/public/images/album/boat.png"
import Mary from "@/public/images/album/mary.png"

export const AlbumImage = ({ album, width, height, paddingRight }: { album: string, width?: number, height?: number, paddingRight?: number }) => {
  switch (album) {
    case "fly you to the moon":
      return <Image src={Fly} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "commas":
      return <Image src={Commas} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "in & out":
      return <Image src={InOut} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "little more time":
      return <Image src={Time} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "i don't wanna party":
      return <Image src={NoParty} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "hail mary":
      return <Image src={Mary} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "i don't wanna party":
      return <Image src={NoParty} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "Uhyuready?":
      return <Image src={UhYuh} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "lost my boat":
      return <Image src={Boat} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "so sick":
      return <Image src={Sick} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "i'm sorry":
      return <Image src={Sorry} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
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
    case "act right":
      return <Image src={ActRight} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "BRIDE AT A BAR":
      return <Image src={Bride} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "4THEHOMIES":
      return <Image src={Four} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "These Days":
      return <Image src={TheseDays} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "why not us?":
      return <Image src={Why} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
    case "smiley":
      return <Image src={Smiley} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} className={`pr-${paddingRight}`} />
    case "Swish":
      return <Image src={Swish} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} className={`pr-${paddingRight}`} />
    default:
      return <Image src={TheLows} alt="The Lows" width={width ?? 75} height={height ?? width ?? 75} />
  }
}
