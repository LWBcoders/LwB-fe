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
import StudentVideo from "../Student/StudentVideo";

function TeacherViewContent() {
  // GET ALL SUBJECTS/YEARS/TEACHERS to use in sorting:
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

  return (
    <>
    
     

      <Routes>
        <Route path="/" element={<TeacherViewContentOptions />} />
        <Route path="quiz" element={<TeacherViewQuiz yearsToDisplay={yearsToDisplay} subjectToDisplay={subjectToDisplay} teacherToDisplay={teacherToDisplay}/>} />
        <Route path="notes" element={<TeacherViewNotes yearsToDisplay={yearsToDisplay} subjectToDisplay={subjectToDisplay} teacherToDisplay={teacherToDisplay}/>} />
        <Route path="videos" element={<StudentVideo yearsToDisplay={yearsToDisplay} subjectToDisplay={subjectToDisplay} teacherToDisplay={teacherToDisplay}/>} />
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