import Image from "next/image"
import Boston from "@/public/images/tour/boston.webp"
import Chicago from "@/public/images/tour/chicago.webp"
import Cleveland from "@/public/images/tour/cleveland.webp"
import Denver from "@/public/images/tour/denver.webp"
import Irving from "@/public/images/tour/irving.webp"
import Minny from "@/public/images/tour/minneapolis.webp"
import Nyc from "@/public/images/tour/nyc.webp"
import Pitt from "@/public/images/tour/pittsburgh.webp"
import Tampa from "@/public/images/tour/tampa.webp"
import Toronto from "@/public/images/tour/toronto.webp"
import TheLows from "@/public/images/lows-playlist-logo.jpeg"
import Steve from "@/public/images/steve.png"
import { Cities } from "@/lib/types"

export const TourCityImage = ({ city }: { city: Cities }) => {
  switch (city) {
    case "boston":
      return <Image src={Boston} alt="Boston" className="px-12 mt-4" width={350} />
    case "chicago":
      return <Image src={Chicago} alt="Chicago" className="px-12 mt-4" width={350} />
    case "cleveland":
      return <Image src={Cleveland} alt="Cleveland" className="px-12 mt-4" width={350} />
    case "denver":
      return <Image src={Denver} alt="Denver" className="px-12 mt-4" width={350} />
    case "irving":
      return <Image src={Irving} alt="Irving" className="px-12 mt-4" width={350} />
    case "minneapolis":
      return <Image src={Minny} alt="Minneapolis" className="px-12 mt-4" width={350} />
    case "nyc" || "nyc (night 2)":
      return <Image src={Nyc} alt="New York City" className="px-12 mt-4" width={350} />
    case "pittsburgh":
      return <Image src={Pitt} alt="Pittsburgh" className="px-12 mt-4" width={350} />
    case "tampa":
      return <Image src={Tampa} alt="Tampa" className="px-12 mt-4" width={350} />
    case "toronto" || "toronto (night 2)":
      return <Image src={Toronto} alt="Toronto" className="px-12 mt-4" width={350} />
    case "steve":
      return <Image src={TheLows} alt="Steve" className="px-12 mt-4" width={350} />
    default:
      return <Image src={TheLows} alt="The Lows" className="px-12 mt-4" width={350} />
  }
}