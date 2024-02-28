import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllSubjects, getAllYears, getTeachers } from "../../../api";
import TeacherCalendar from "./TeacherCalendar";
// import TeacherBroadcast from "./TeacherBroadcast";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherHeader from "./TeacherHeader";
import TeacherNavigation from "./TeacherNavigation";
import TeacherAddLesson from "./TeacherAddLesson";
import TeacherViewMyContent from "./TeacherViewMyContent";
import TeacherViewContent from "./TeacherViewContent";
import TeacherProfile from "./TeacherProfile";
import StudentVideo from "../Student/StudentVideo";
import StudentNotes from "../Student/StudentNotes";

function TeacherHome() {
  const [subjectToDisplay, setSubjectToDisplay] = useState([]);
  const [yearsToDisplay, setYearsToDisplay] = useState([]);
  const [teachersToDisplay, setTeachersToDisplay] = useState([]);

  useEffect(() => {
    getAllSubjects().then((response) => [
      setSubjectToDisplay(response.subjects)
    ]);
    getAllYears().then((response) => {
      setYearsToDisplay(response.years);
    });
    getTeachers().then((response) => {
      setTeachersToDisplay(response);
    });
  }, []);
  const url = "teacher";
  return (
    <section className="teacherHome">
      <TeacherHeader />

      <Routes>
        <Route path="/" element={<TeacherNavigation />} />
        <Route path="add-lesson/*" element={<TeacherAddLesson />} />
        <Route path="calendar" element={<TeacherCalendar />} />
        {/* <Route path="live" element={<TeacherBroadcast />} /> */}
        <Route path="add-quiz" element={<TeacherAddQuiz />} />
        <Route path="view-my-content/*" element={<TeacherViewMyContent />} />

        <Route path="view-content/*" element={<TeacherViewContent />} />
        <Route path="profile" element={<TeacherProfile />} />

        <Route
          path="videos/:id"
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
          path="notes/:id"
          element={
            <StudentNotes
              url={url}
              subjectToDisplay={subjectToDisplay}
              yearsToDisplay={yearsToDisplay}
              teachersToDisplay={teachersToDisplay}
            />
          }
        />
      </Routes>
    </section>
  );
}

export default TeacherHome;
