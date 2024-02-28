import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos, deleteVideo, viewVideo } from "../../../api";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

function TeacherViewMyVideo({ yearsToDisplay, subjectToDisplay }) {
  const [allVideos, setAllVideos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);

  const teacher = loggedInUser.userName;
  const subject = searchParams.get("subject") || "";
  const year = searchParams.get("year") || "";

  const newParams = new URLSearchParams(searchParams);

  useEffect(() => {
    getAllVideos(subject, teacher, year)
      .then((response) => {
        setAllVideos(response);
        setIsLoading(false);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, [subject, year, teacher]);

  function handleYear(event) {
    newParams.set("year", event.target.value);
    setSearchParams(newParams);
  }

  function handleSubject(event) {
    newParams.set("subject", event.target.value);
    setSearchParams(newParams);
  }

  function handleView(id){
    viewVideo(id).then(()=>{
     
    })
  }

  function handleDelete(id) {
    deleteVideo(id)
      .then(() => {
        setIsDeleted(true);
        window.location.reload();
      })
      .catch(() => {
        setError("Couldn't delete video");
      });
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="displayMyVideo-section listOfQuizzes">
      <h1>List of my Videos</h1>
      {isLoading ? <p>Loading Videos ...</p> : null}
      
      <ul key="videosList" className="video-list">
        <>
        <div className="sortMyVideos-wrapper">
          <div className="subjectDropdownWrapperVideo">
          <label htmlFor="subject"></label>
          <select
            className="drop-down video-dropdown"
            value={subject}
            onChange={handleSubject}
            required
          >
            <option value="">All subjects</option>
            {subjectToDisplay.map((subject, index) => (
              <option key={index} value={subject.subject}>
                {subject.subject}
              </option>
            ))}
          </select>
          </div>
          <br></br>
          <div className="yearsDropdownWrapperVideo">
          <label htmlFor="years"></label>
          <select
            required
            className="drop-down video-dropdown"
            value={year}
            onChange={handleYear}
          >
            <option value="">All Years</option>
            {yearsToDisplay.map((year, index) => (
              <option key={index} value={year.year}>
                {year.year}
              </option>
            ))}
          </select>
          </div>
          </div>
          <br></br>
        </>

        {allVideos.length === 0 ? (
          <p className="sorryMsg">Sorry no videos available ....</p>
        ) : (
          allVideos.map((video) => {
            return (
              // <>
              //   <VideoCard
              //     key={video.title}
              //     video={video}
              //     allVideos={allVideos}
              //     setAllVideos={setAllVideos}

              //   />
              // </>
              <>
                <div className="video-wrapper myvideo-wrapper">
                  <Link
                    className="video-titles"
                    to={`/teacher/home/view-my-content/my-videos/${video._id}`}
                  >
                    {video.title}
                  </Link>
                  <video onPlay={() => handleView(video._id)} height="150px" src={video.url} controls></video>
                  <div className="videoDetails-wrapper myvideoDetails-wrapper ">
                  <div className="video-descrip-wrapper videodescrip-wrapper-extra">
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
                      onClick={() => handleDelete(video._id)}
                    >
                      Delete
                    </button>
                  ) : null}
                  {error ? (
                    error
                  ) : (
                    <p>{isDeleted ? "Video has been deleted" : null}</p>
                  )}
                </div>
              </>
            );
          })
        )}
      </ul>
    </section>
  );
}

export default TeacherViewMyVideo;
