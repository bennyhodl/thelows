import Image from "next/image";
import TheLows from "@/public/the-lows.jpeg"
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gray-800">
      <div className="relative w-full h-96 overflow-hidden">
        {/* <Image src="/path/to/your/image.jpg" alt="Descriptive Alt Text" layout="fill" objectFit="cover" /> */}
        <Image src={TheLows} alt="The Lows Album Cover" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-800 to-transparent"></div>
      </div>
      <div className="flex flex-col justify-around items-center pb-12 text-white text-center h-1/2">
        <div className="flex flex-col px-3">
          <h1 className="text-3xl pb-2">The Lows List</h1>
          <p className="">Rank your favorite songs from The Lows and see how they rank with other mike. fans.</p>
        </div>
        <Link href="/album" legacyBehavior>
          <a className="btn rounded-3xl w-3/4 bg-orange-700 py-3 px-4">Create List</a>
        </Link>
      </div>
      <Footer />
    </div >
  );
}
