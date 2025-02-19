import { useEffect, useRef } from "react";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        // Only play if the video was previously playing
        video.play().catch(() => {
          // Handle any autoplay restrictions
          console.log('Playback prevented');
        });
      }
    };

    // Function to handle tab focus
    const handleFocus = () => {
      video.play().catch(() => {
        console.log('Playback prevented');
      });
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      >
        <source
          src="https://lyric-generator-bucket.s3.us-east-2.amazonaws.com/concert-2.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

