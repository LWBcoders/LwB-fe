import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import StudentCalender from "./StudentCalender";
import StudentVideo from "./StudentVideo";
import StudentNotes from "./StudentNotes";
import StudentQuiz from "./StudentQuiz";
import StudentViewStream from "./StudentViewStream";
import { getAllSubjects, getAllYears } from "../../../api";
import StudentQuizSingleDisplay from "./StudentQuizSingleDisplay";
import StudentHeader from "./StudentHeader";
import StudentNavigation from "./StudentNavigation";
import SingleVideo from "./SingleVideo";

function StudentHome() {
  // GET ALL SUBJECTS/YEARS/TEACHERS to use in sorting:
  const [subjectToDisplay, setSubjectToDisplay] = useState([])
  const [yearsToDisplay, setYearsToDisplay] = useState([])
  
  useEffect(()=>{
    getAllSubjects()
    .then((response)=>[
        setSubjectToDisplay(response.subjects)
    ])
    getAllYears()
    .then((response)=>{
        setYearsToDisplay(response.years)
    })
}, [])

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
      <Route path="/" element={<StudentNavigation/>}/>
     <Route path="calender" element={<StudentCalender/>}/>
     <Route path="videos" element={<StudentVideo/>}/>
     <Route path="notes" element={<StudentNotes/>}/>
     
     <Route path="/quiz/quiz/:id" element={<StudentQuizSingleDisplay/>}/>
     <Route path="quiz" element={<StudentQuiz subjectToDisplay={subjectToDisplay} yearsToDisplay={yearsToDisplay}/>}/>
     <Route path="view" element={<StudentViewStream/>}/>
     <Route path="/videos/:id" element={<SingleVideo/>}/>
     </Routes>
    </>
  );
}

export default StudentHome;
