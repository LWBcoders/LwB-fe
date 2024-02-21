import { Link, Routes, Route } from "react-router-dom";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherAddNotes from "./TeacherAddNotes";
import TeacherAddVideo from "./TeacherAddVideo";

function TeacherAddLesson() {
  return (
    <>
      <p>teacher add lesson</p>
      <Link to="/teacher/home/add-lesson/quiz" className="home-button">
        add quiz
      </Link>
      <br></br>
      <Link to="/teacher/home/add-lesson/notes" className="home-button">
       add notes
      </Link>
      <br></br>
      <Link to="/teacher/home/add-lesson/videos" className="home-button">
       add videos
      </Link>
      <br></br>

      <Routes>
        <Route path="quiz" element={<TeacherAddQuiz/>} />
        <Route path="notes" element={<TeacherAddNotes />} />
        <Route path="videos" element={<TeacherAddVideo />} />
      </Routes>
    </>
  );
}

export default TeacherAddLesson;
