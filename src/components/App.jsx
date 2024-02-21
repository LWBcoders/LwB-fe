import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Teacher from "./Teacher/Teacher"
import Student from "./Student/Student"
import StudentHome from "./Student/StudentHome";
import TeacherHome from "./Teacher/TeacherHome";
import TeacherAddLesson from "./Teacher/TeacherAddLesson";


function App() {
 
  return (
    <>
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/student/*" element={<Student/>}/>
     <Route path="/teacher/*" element={<Teacher/>}/>
     <Route path="/student/home/*" element={<StudentHome/>}/>
     <Route path="/teacher/home/*" element={<TeacherHome/>}/>
     <Route path="/teacher/home/add-lesson/*" element={<TeacherAddLesson/>}/>
     </Routes>
    </>
  )
}

export default App
