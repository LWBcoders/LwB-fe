import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos, deleteVideo } from "../../../api";
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
    <>
      {isLoading ? <p>Loading Videos ...</p> : null}
      <ul key="videosList" className="video-list">
        <>
          <label htmlFor="subject"></label>
          <select
            className="drop-down"
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
          <br></br>
          <label htmlFor="years"></label>
          <select
            required
            className="drop-down"
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
          <br></br>
        </>

        {allVideos.length === 0 ? (
          <p>Sorry no videos available ....</p>
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
                <div className="video-wrapper">
                  <Link
                    className="video-titles"
                    to={`/student/home/videos/${video._id}`}
                  >
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
    </>
  );
}

export default TeacherViewMyVideo;
