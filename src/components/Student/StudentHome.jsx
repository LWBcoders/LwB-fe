import { Link, Routes, Route } from "react-router-dom";
import StudentCalender from "./StudentCalender";
import StudentVideo from "./StudentVideo";
import StudentNotes from "./StudentNotes";
import StudentQuiz from "./StudentQuiz";
import StudentViewStream from "./StudentViewStream";

function StudentHome() {
  return (
    <>
      <p>student home </p>
      <section className="studentsMainScreen">
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/student/home/calender'> <i className="fa-regular fa-calendar-days icon-studentBlock"></i> Calender of Events</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/student/home/videos'><i className="fa-brands fa-youtube icon-studentBlock"></i> Video Lessons</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/student/home/notes'> <i className="fa-solid fa-book-open-reader icon-studentBlock"></i> Notes</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/student/home/quiz'><i className="fa-solid fa-circle-question icon-studentBlock"></i> Quiz</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/student/home/view'><i className="fa-solid fa-circle-question icon-studentBlock"></i> View Stream</Link>
            </div>

        </section>
      {/* <Link to="/student/home/calender" className="home-button">Student calender</Link>
      <br></br>
      <Link to="/student/home/videos" className="home-button">Student videos</Link>
      <br></br>
      <Link to="/student/home/notes" className="home-button">Student notes</Link>
      <br></br>
      <Link to="/student/home/quiz" className="home-button">Student quiz</Link>
      <br></br>
      <Link to="/student/home/view" className="home-button">Student view stream</Link> */}

      <Routes>
     <Route path="calender" element={<StudentCalender/>}/>
     <Route path="videos" element={<StudentVideo/>}/>
     <Route path="notes" element={<StudentNotes/>}/>
     <Route path="quiz" element={<StudentQuiz/>}/>
     <Route path="view" element={<StudentViewStream/>}/>
     </Routes>
    </>
  );
}

export default StudentHome;
