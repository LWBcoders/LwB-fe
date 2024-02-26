import "../../../css/viewVideo.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { deleteVideo } from "../../../api";

function VideoCard({ video, allVideos, setAllVideos,}) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);

  function handleDelete() {
    deleteVideo(video._id)
      .then(() => {
        setIsDeleted(true);
        window.location.reload()
      })
      .catch(() => {
        setError("Couldn't delete video");
      });
  }

  return (
    <>
      <div className="video-wrapper">
        <Link className="video-titles" to={`/student/home/videos/${video._id}`}>
          {video.title}
        </Link>
        <p>Year: {video.year}</p>
        <p>{video.teacher}</p>
        <p>{video.subject}</p>
        <video height="150px" src={video.url} controls></video>
        {video.teacher === loggedInUser.userName ? (
          <button
            id="delete-button"
            disabled={isDeleted}
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        ) : null}
        {error ? error : <p>{isDeleted ? "Video has been deleted" : null}</p>}
      </div>
    </>
  );
}

export default VideoCard;
