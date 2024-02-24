import TeacherViewMyQuiz from "./TeacherViewMyQuiz";
import { Link, Routes, Route } from "react-router-dom";
import TeacherViewMyNotes from "./TeacherViewMyNotes";
import TeacherViewMyVideo from "./TeacherViewMyVideo";
import StudentQuizSingleDisplay from "../Student/StudentQuizSingleDisplay";
function TeacherViewMyContent() {


    return ( <>
   <section className="addLessons-section">

<nav className="addLessonsWrapper">
  <div className="addLessons-option">
    <Link className="addLesson-link" to='/teacher/home/view-my-content/my-videos'>My Video</Link>
  </div>

  <div className="addLessons-option">
    <Link className="addLesson-link" to='/teacher/home/view-my-content/my-notes'>My Notes</Link>
  </div>

  <div className="addLessons-option">
    <Link className="addLesson-link" to='/teacher/home/view-my-content/my-quiz'>My Quizzes</Link>
  </div>
</nav>

        <Routes>
        <Route path="my-quiz" element={<TeacherViewMyQuiz />} />
        <Route path="my-quiz/quiz/:id" element={<StudentQuizSingleDisplay />} />
        <Route path="my-notes" element={<TeacherViewMyNotes />} />
        <Route path="my-videos" element={<TeacherViewMyVideo />} />
      </Routes>
    </section>



    </> );
}

export default TeacherViewMyContent;