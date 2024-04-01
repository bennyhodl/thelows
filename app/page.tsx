import Image from "next/image";
import TheLows from "@/public/the-lows.jpeg"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center h-full">
      <Image src={TheLows} alt="The Lows Album Cover" />
      <div className="justify-center items-center pb-12">
        <Link href="/five-songs" legacyBehavior>
          <a className="btn text-white bg-blue-400 h-12 justify-center rounded-xl">Pick Top 5 Songs</a>
        </Link>
        <p>or</p>
        <Link href="/album" legacyBehavior>
          <a className="text-white underline">Pick Full Album List</a>
        </Link>
      </div>
    </div >
  );
}
