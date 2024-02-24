import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
// import TeacherAddQuiz from "./TeacherAddQuiz";
// import TeacherAddNotes from "./TeacherAddNotes";
// import TeacherAddVideo from "./TeacherAddVideo";
import TeacherViewNotes from "./TeacherViewNotes";
import TeacherViewVideos from "./TeacherViewVideos";
import TeacherViewQuiz from "./TeacherViewQuiz";
import TeacherViewContentOptions from "./TeacherViewContentOptions";
import { getAllSubjects, getAllYears, getTeachers } from "../../../api";
import StudentQuizSingleDisplay from "../Student/StudentQuizSingleDisplay";

function TeacherViewContent() {
  // GET ALL SUBJECTS/YEARS/TEACHERS to use in sorting:
  const [subjectToDisplay1, setSubjectToDisplay1] = useState([])
  const [yearsToDisplay1, setYearsToDisplay1] = useState([])
  const [teacherToDisplay1, setTeacherToDisplay1] = useState([])
  
  useEffect(()=>{
    getAllSubjects()
    .then((response)=>[
        setSubjectToDisplay1(response.subjects)
    ])
    getAllYears()
    .then((response)=>{
        setYearsToDisplay1(response.years)
    })
    getTeachers()
    .then((response)=>{
      setTeacherToDisplay1(response);
    })
}, [])

  return (
    <>
    
     

      <Routes>
        <Route path="/" element={<TeacherViewContentOptions />} />
        <Route path="quiz" element={<TeacherViewQuiz yearsToDisplay1={yearsToDisplay1} subjectToDisplay1={subjectToDisplay1} teacherToDisplay1={teacherToDisplay1}/>} />
        <Route path="quiz/quiz/:id" element={<StudentQuizSingleDisplay/>} />
        <Route path="notes" element={<TeacherViewNotes yearsToDisplay1={yearsToDisplay1} subjectToDisplay1={subjectToDisplay1}/>} />
        <Route path="videos" element={<TeacherViewVideos yearsToDisplay1={yearsToDisplay1} subjectToDisplay1={subjectToDisplay1}/>} />
      </Routes>
    </>
  );
}

export default TeacherViewContent;


 {/* <p>teacher view lesson</p>
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
      <br></br> */}