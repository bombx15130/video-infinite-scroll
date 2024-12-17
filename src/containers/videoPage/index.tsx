import { useEffect, useState } from "react"
import { createClient } from "pexels";
import VideoCard from "./VideoCard"

const VideoPage = () => {
  const [videos, setvideos] = useState<any[]>([]);
  const [videosLoaded, setvideosLoaded] = useState(false);

  const randomQuery = () => {
    const queries = ["Funny", "Art", "Animals", "Coding", "Space"];
    return queries[Math.floor(Math.random() * queries.length)];
  };

  const getVideos = (length: number) => {
    // Replace with your Pexels API Key
    const client = createClient("Tc5o0eRcOKGZucChyX01Aakr62hE3PNSspEZgKGRhfAVVw00zOIRY2Tr");

    const query = randomQuery();
    client.videos
      .search({ query, per_page: length })
      .then((result: any) => {
        setvideos((oldVideos) => [...oldVideos, ...result.videos]);
        setvideosLoaded(true);
      })
      .catch((e) => setvideosLoaded(false));
  };

  useEffect(() => {
    getVideos(3);
  }, []);

  return (
    <div className="video-page">
      <div className="slider-container">
        {videos.length > 0 ? (
          <>
            {videos.map((video, id) => (
              <VideoCard
                key={id}
                index={id}
                author={video.user.name}
                videoURL={video.video_files[0].link}
                authorLink={video.user.url}
                lastVideoIndex={videos.length - 1}
                getVideos={getVideos}
              />
            ))}
          </>
        ) : (
          <>
            <h1>Nothing to show here</h1>
          </>
        )}
      </div>
    </div>
  )
}

export default VideoPage