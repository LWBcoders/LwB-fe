import { Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherAddNotes from "./TeacherAddNotes";
import TeacherAddVideo from "./TeacherAddVideo";
import { getAllSubjects, getAllYears, getTeachers } from "../../../api"

function TeacherAddLesson() {
    const [allSubjects, setAllSubjects] = useState("");
    const [allTeachers, setAllTeachers] = useState("");
    const [allYears, setAllYears] = useState("");
    const [completed, setCompleted] = useState(false);


    useEffect(() => {
        getAllSubjects()
          .then((response) => {
            const subjects = response.subjects;
            const subjectsArray = [];
            for (let i = 0; i < subjects.length; i++) {
              subjectsArray.push(subjects[i].subject);
            }
            setAllSubjects(subjectsArray);
          })
          .then(() => {
            getTeachers().then((response) => {
              const teachers = response;
              const teachersArray = [];
              for (let i = 0; i < teachers.length; i++) {
                teachersArray.push(teachers[i].userName);
              }
              setAllTeachers(teachersArray);
            });
          })
          .then(() => {
            getAllYears()
              .then((response) => {
                const years = response.years;
                const yearsArray = [];
                for (let i = 0; i < years.length; i++) {
                  yearsArray.push(years[i].year);
                }
                setAllYears(yearsArray);
              })
              .then(() => {
                setCompleted(true);
              });
          });
      }, []);

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
        <Route path="videos" element={<TeacherAddVideo allSubjects={allSubjects} allYears={allYears} completed={completed}/>} />
      </Routes>
    </section>
  );
}

export default TeacherAddLesson;
