import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Teacher from "./Teacher/Teacher"
import Student from "./Student/Student"
import StudentHome from "./Student/StudentHome";
import TeacherHome from "./Teacher/TeacherHome";
import TeacherAddLesson from "./Teacher/TeacherAddLesson";
import TeacherViewContent from "./Teacher/TeacherViewContent"
import UserContext from "../../contexts/UserContext"
import { useState } from 'react'


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <>
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/student/*" element={<Student/>}/>
     <Route path="/teacher/*" element={<Teacher/>}/>
     <Route path="/student/home/*" element={<StudentHome/>}/>
     <Route path="/teacher/home/*" element={<TeacherHome/>}/>
     {/* <Route path="/teacher/home/add-lesson/*" element={<TeacherAddLesson/>}/> */}
     {/* <Route path="/teacher/home/view-content/*" element={<TeacherViewContent/>}/> */}
     </Routes>
     </UserContext.Provider>
    </>
  )
}

export default App
