import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAllSubjects, getAllYears } from "../../../api";

function StudentNavigation() {
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
                <Link className="studentblock-item" to='/student/home/view'>
                <i className="fa-solid fa-video icon-studentBlock"></i>
                  View Stream</Link>
            </div>

        </section>
    

    
    </>
  );
}

export default StudentNavigation;
