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
      <Link to="/student/home/calender" className="home-button">Student calender</Link>
      <br></br>
      <Link to="/student/home/videos" className="home-button">Student videos</Link>
      <br></br>
      <Link to="/student/home/notes" className="home-button">Student notes</Link>
      <br></br>
      <Link to="/student/home/quiz" className="home-button">Student quiz</Link>
      <br></br>
      <Link to="/student/home/view" className="home-button">Student view stream</Link>

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
