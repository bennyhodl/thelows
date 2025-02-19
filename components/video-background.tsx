export function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
      <video autoPlay muted loop playsInline className="h-full w-full object-cover">
        <source
          // src="https://lyric-generator-bucket.s3.us-east-2.amazonaws.com/output.mp4"
          src="https://lyric-generator-bucket.s3.us-east-2.amazonaws.com/concert.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}

