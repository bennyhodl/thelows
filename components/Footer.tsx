export const Footer = ({ full, white = false }: { full: boolean, white?: boolean }) => {
  if (full) {
    return <p className={`${!white ? "text-black" : "text-white"} py-4 md:max-w-lg w-full text-center mx-auto font-serif text-lg fixed bottom-0 ne`}>🌊 by <a className="underline" href="https://instagram.com/ben_schroth">benny b</a></p>
  } else {
    return <p className={`${!white ? "text-black" : "text-white"} py-4 md:max-w-lg w-full text-center mx-auto font-serif text-lg  ne`}>🌊 by <a className="underline" href="https://instagram.com/ben_schroth">benny b</a></p>
  }
}
