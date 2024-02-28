import "../../../css/viewVideo.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import { deleteVideo, viewVideo } from "../../../api";

function VideoCard({ video, url}) {
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
        <Link className="video-titles" to={`/${url}/home/videos/${video._id}`}>
          {video.title}
        </Link>
        <video  onPlay={handleView} height="150px" src={video.url} controls on></video>
        <div className="videoDetails-wrapper">
          <div className="video-descrip-wrapper">
          <p>{video.subject}</p>
          <p className="videoDesc-year">Year: {video.year}</p>
          <p>Teacher: {video.teacher}</p>
          
         </div>

          <p>{video.views} Views</p>
        </div>
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
