import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../../../api";
import VideoCard from "./VideoCard";

function StudentVideo({ subjectToDisplay, yearsToDisplay, teacherToDisplay }) {
  const [allVideos, setAllVideos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const subject = searchParams.get("subject") || "";
  const teacher = searchParams.get("teacher") || "";
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
    },
    [subject, teacher, year]
  );

  function handleYear(event) {
    newParams.set("year", event.target.value);
    setSearchParams(newParams);
  }

  function handleSubject(event) {
    newParams.set("subject", event.target.value);
    setSearchParams(newParams);
  }

  function handleTeacher(event) {
    newParams.set("teacher", event.target.value);
    setSearchParams(newParams);
  }

  if (error) {
    return <p>{error}</p>;
  }

  

  return (
    <>
      {isLoading ? <p>Loading Videos ...</p> : null}
      <ul key="videosList" className="video-list">
        <h2 className="all-videos-title">All videos</h2>
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
          <select
            className="drop-down"
            value={teacher}
            onChange={handleTeacher}
            required
          >
            <option value="">All Teachers</option>
            {teacherToDisplay.map((teacher, index) => (
              <option key={index} value={teacher.userName}>
                {teacher.userName}
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

export default StudentVideo;
