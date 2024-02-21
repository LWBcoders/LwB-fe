import { Link, Routes, Route } from "react-router-dom";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherAddNotes from "./TeacherAddNotes";
import TeacherAddVideo from "./TeacherAddVideo";
import TeacherViewNotes from "./TeacherViewNotes";
import TeacherViewVideos from "./TeacherViewVideos";
import TeacherViewQuiz from "./TeacherViewQuiz";

function TeacherAddLesson() {
  return (
    <>
      <p>teacher view lesson</p>
      <Link to="/teacher/home/view-content/quiz" className="home-button">
        view quiz
      </Link>
      <br></br>
      <Link to="/teacher/home/view-content/notes" className="home-button">
       view notes
      </Link>
      <br></br>
      <Link to="/teacher/home/view-content/videos" className="home-button">
       view videos
      </Link>
      <br></br>

      <Routes>
        <Route path="quiz" element={<TeacherViewQuiz/>} />
        <Route path="notes" element={<TeacherViewNotes />} />
        <Route path="videos" element={<TeacherViewVideos />} />
      </Routes>
    </>
  );
}

export default TeacherAddLesson;
