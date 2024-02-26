import TeacherViewMyQuiz from "./TeacherViewMyQuiz";
import { useState, useEffect } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import TeacherViewMyNotes from "./TeacherViewMyNotes";
import TeacherViewMyVideo from "./TeacherViewMyVideo";
import StudentQuizSingleDisplay from "../Student/StudentQuizSingleDisplay";
import { getAllSubjects, getTeachers, getAllYears } from "../../../api";

function TeacherViewMyContent() {



  const [subjectToDisplay, setSubjectToDisplay] = useState([])
  const [yearsToDisplay, setYearsToDisplay] = useState([])
  const [teacherToDisplay, setTeacherToDisplay] = useState([])
  
  useEffect(()=>{
    getAllSubjects()
    .then((response)=>[
        setSubjectToDisplay(response.subjects)
    ])
    getAllYears()
    .then((response)=>{
        setYearsToDisplay(response.years)
    })
    getTeachers()
    .then((response)=>{
      setTeacherToDisplay(response);
    })
}, [])

    return ( <>
   <section className="addLessons-section">

<nav className="addLessonsWrapper">
  <div className="addLessons-option">
    <Link className="addLesson-link" to='/teacher/home/view-my-content/my-videos'>My Videos</Link>
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
        <Route path="my-videos" element={<TeacherViewMyVideo yearsToDisplay={yearsToDisplay} subjectToDisplay={subjectToDisplay}/>} />
      </Routes>
    </section>



    </> );
}

export default TeacherViewMyContent;