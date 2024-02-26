import "../../../css/viewVideo.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { deleteVideo, viewVideo } from "../../../api";

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

  function handleView(){
    viewVideo(video._id).then(()=>{
     
    })
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
        <video  onPlay={handleView} height="150px" src={video.url} controls on></video>
        <p>{video.views} Views</p>
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
