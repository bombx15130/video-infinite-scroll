import { useRef, useState, useEffect } from 'react'
import useIsInViewport from "../../hooks/useIsInViewport";

type VideoCardProps = {
  index: number,
  lastVideoIndex: number,
  getVideos: (length: number) => void,
  author: string,
  videoURL: string,
  authorLink: string,
}

const VideoCard = (props: VideoCardProps) => {
  const { index, lastVideoIndex, getVideos, videoURL, author, authorLink } = props
  const videoRef = useRef<HTMLVideoElement>(null!)
  const isInViewport = useIsInViewport(videoRef)
  const [loadNewVidsAt, setloadNewVidsAt] = useState(lastVideoIndex);
console.log(index, isInViewport)
  if (isInViewport) {
    setTimeout(() => {
      videoRef.current.play();
    }, 1000);

    if (loadNewVidsAt === Number(videoRef.current.id)) {
      setloadNewVidsAt((prev) => prev + 2);
      getVideos(3);
    }
  }

  const togglePlay = () => {
    let currentVideo = videoRef.current;
    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  };

  useEffect(() => {
    if (!isInViewport) {
      videoRef.current.pause();
    }
  }, [isInViewport]);


  return (
    <div className="slider-children">
      <video
        muted
        className="video-container"
        ref={videoRef}
        onClick={togglePlay}
        id={`${index}`}
        autoPlay={true}
      >
        <source src={videoURL} type="video/mp4" />
      </video>
      <div className="video-content" onClick={togglePlay}>
        <p>@{author}</p>
        <p>
          Video by <a href={authorLink}>{author} </a> on Pexel
        </p>
      </div>
    </div>
  )
}

export default VideoCard