export const Footer = ({ full }: { full: boolean }) => {
  if (full) {
    return <p className="text-white py-4 text-sm md:max-w-lg w-full text-center mx-auto font-bold fixed bottom-0 bg-custom">🌊 by <a className="underline" href="https://instagram.com/ben_schroth">benny bitcoin</a></p>
  } else {
    return <p className="text-white py-4 text-sm md:max-w-lg w-full text-center mx-auto font-bold bg-custom">🌊 by <a className="underline" href="https://instagram.com/ben_schroth">benny bitcoin</a></p>
  }
}
