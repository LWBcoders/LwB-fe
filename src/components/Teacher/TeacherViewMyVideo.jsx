import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../../../api";
import VideoCard from "../Student/VideoCard";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function TeacherViewMyVideo({yearsToDisplay, subjectToDisplay}) {
  const [allVideos, setAllVideos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);

  
  const teacher = loggedInUser.userName
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
  }, [subject, year]);

  function handleYear(event) {
    newParams.set("year", event.target.value);
    setSearchParams(newParams);
  }

  function handleSubject(event) {
    newParams.set("subject", event.target.value);
    setSearchParams(newParams);
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
              <>
                <VideoCard
                  key={video.title}
                  video={video}
                  allVideos={allVideos}
                />
              </>
            );
          })
        )}
      </ul>
    </>
  );
}

export default TeacherViewMyVideo;
