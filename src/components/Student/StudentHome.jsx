import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentCalendar from "./StudentCalendar";
import StudentVideo from "./StudentVideo";
import StudentNotes from "./StudentNotes";
import StudentQuiz from "./StudentQuiz";
import StudentViewStream from "./StudentViewStream";
import { getAllSubjects, getAllYears, getTeachers } from "../../../api";
import StudentQuizSingleDisplay from "./StudentQuizSingleDisplay";
import StudentHeader from "./StudentHeader";
import StudentNavigation from "./StudentNavigation";
import SingleVideo from "./SingleVideo";
import SingleNote from "./SingleNote";
import StudentProfile from "./StudentProfile";

function StudentHome() {
  // GET ALL SUBJECTS/YEARS/TEACHERS to use in sorting:
  const [subjectToDisplay, setSubjectToDisplay] = useState([]);
  const [yearsToDisplay, setYearsToDisplay] = useState([]);
  const [teachersToDisplay, setTeachersToDisplay] = useState([]);

  useEffect(() => {
    getAllSubjects().then((response) => [
      setSubjectToDisplay(response.subjects),
    ]);
    getAllYears().then((response) => {
      setYearsToDisplay(response.years);
    });
    getTeachers().then((response) => {
      setTeachersToDisplay(response);
    });
  }, []);
const pathToAllQuiz = "/student/home/quiz";
const url = "student"
  return (
    <>
      <StudentHeader />
      {/* <section className="studentsMainScreen">
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
                <Link className="studentblock-item" to='/student/home/view'>
                <i className="fa-solid fa-video icon-studentBlock"></i>
                  View Stream</Link>
            </div>

        </section> */}

      <Routes>
        <Route path="/" element={<StudentNavigation />} />
        <Route path="calendar" element={<StudentCalendar />} />
        <Route
          path="videos"
          element={
            <StudentVideo
            url={url}
              subjectToDisplay={subjectToDisplay}
              yearsToDisplay={yearsToDisplay}
              teachersToDisplay={teachersToDisplay}
            />
          }
        />
        <Route
          path="notes"
          element={
            <StudentNotes
              subjectToDisplay={subjectToDisplay}
              yearsToDisplay={yearsToDisplay}
              teachersToDisplay={teachersToDisplay}
            />
          }
        />

        <Route path="/quiz/quiz/:id" element={<StudentQuizSingleDisplay pathToAllQuiz={pathToAllQuiz}/>} />
        <Route
          path="quiz"
          element={
            <StudentQuiz
              subjectToDisplay={subjectToDisplay}
              yearsToDisplay={yearsToDisplay}
              teachersToDisplay={teachersToDisplay}
            />
          }
        />
        <Route path="view" element={<StudentViewStream />} />
        <Route path="/videos/:id" element={<SingleVideo />} />
        <Route path="/notes/:id" element={<SingleNote />} />
        <Route path="profile" element={<StudentProfile/>}/>
      </Routes>
    </>
  );
}

export default StudentHome;
