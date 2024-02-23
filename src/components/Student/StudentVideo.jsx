import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../../../api";
import VideoCard from "./VideoCard";

function StudentVideo() {
  const [allVideos, setAllVideos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const subject = searchParams.get("subject");
  const teacher = searchParams.get("teacher");
  const year = searchParams.get("year");

  useEffect(() => {
    getAllVideos()
      .then((response) => {
        setAllVideos(response);
        setIsLoading(false);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, [subject, teacher, year]);

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {isLoading ? <p>Loading Videos ...</p> : null}
      <ul key="videosList" className="video-list">
        <h2 className="all-videos-title">All videos</h2>
        {allVideos.map((video) => {
          return (
            <>
              <VideoCard
                key={video.title}
                video={video}
                allVideos={allVideos}
              />
            </>
          );
        })}
      </ul>
    </>
  );
}

export default StudentVideo;
