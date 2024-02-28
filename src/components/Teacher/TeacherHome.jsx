import { Link, Routes, Route } from "react-router-dom";
import TeacherCalendar from "./TeacherCalendar";
// import TeacherBroadcast from "./TeacherBroadcast";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherHeader from "./TeacherHeader";
import TeacherNavigation from "./TeacherNavigation";
import TeacherAddLesson from "./TeacherAddLesson";
import TeacherViewMyContent from "./TeacherViewMyContent";
import TeacherViewContent from "./TeacherViewContent";
import TeacherProfile from "./TeacherProfile";

function TeacherHome() {
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
      </Routes>
    </section>
  );
}

export default TeacherHome;
