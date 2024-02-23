import "../../../css/viewVideo.css";
import { Link } from "react-router-dom";

function VideoCard({ video, allVideos }) {
  return (
    <>
      <div className="video-wrapper">
        <Link className="video-titles" to={`/student/home/videos/${video._id}`} >{video.title}</Link>
        <p>Year: {video.year}</p>
        <p>{video.teacher}</p>
        <p>{video.subject}</p>
        <video height="150px" src={video.url} controls></video>
      </div>
    </>
  );
}

export default VideoCard;
