import { Link, Routes, Route } from "react-router-dom";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherAddNotes from "./TeacherAddNotes";
import TeacherAddVideo from "./TeacherAddVideo";

function TeacherAddLesson() {
  return (
    <section className="addLessons-section">

      <nav className="addLessonsWrapper">
        <div className="addLessons-option">
          <Link className="addLesson-link" to='/teacher/home/add-lesson/videos'>Add new Video</Link>
        </div>

        <div className="addLessons-option">
          <Link className="addLesson-link" to='/teacher/home/add-lesson/notes'>Add Notes</Link>
        </div>

        <div className="addLessons-option">
          <Link className="addLesson-link" to='/teacher/home/add-lesson/quiz'>Add a Quiz</Link>
        </div>
      </nav>


      {/* <Link to="/teacher/home/add-lesson/quiz" className="home-button">
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
      <br></br> */}

      <Routes>
        <Route path="quiz" element={<TeacherAddQuiz/>} />
        <Route path="notes" element={<TeacherAddNotes />} />
        <Route path="videos" element={<TeacherAddVideo />} />
      </Routes>
    </section>
  );
}

export default TeacherAddLesson;
