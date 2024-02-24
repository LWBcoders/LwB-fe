import { Link, Routes, Route } from "react-router-dom";
import TeacherCalendar from "./TeacherCalendar";
import TeacherBroadcast from "./TeacherBroadcast";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherHeader from "./TeacherHeader";
import TeacherNavigation from "./TeacherNavigation";
import TeacherAddLesson from "./TeacherAddLesson";
import TeacherViewMyContent from "./TeacherViewMyContent";
import TeacherViewContent from "./TeacherViewContent";

function TeacherHome() {
  return (
    <section className="teacherHome">
      <TeacherHeader />

      <Routes>
        <Route path="add-lesson/*" element={<TeacherAddLesson />} />
        <Route path="/" element={<TeacherNavigation />} />
        <Route path="calender" element={<TeacherCalendar />} />
        <Route path="live" element={<TeacherBroadcast />} />
        <Route path="add-quiz" element={<TeacherAddQuiz />} />
        <Route path="view-my-content/*" element={<TeacherViewMyContent />} />

        <Route path="view-content/*" element={<TeacherViewContent />} />
      </Routes>
    </section>
  );
}

export default TeacherHome;
