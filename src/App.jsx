import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Teacher from "./Teacher"
import Broadcast from "./Broadcast"
import Student from "./Student"
import View from "./View"

function App() {
 
  return (
    <>
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/student" element={<Student/>}/>
     <Route path="/teacher" element={<Teacher/>}/>
     <Route path="/broadcast" element={<Broadcast/>}/>
     <Route path="/view" element={<View/>}/>
     </Routes>
    </>
  )
}

export default App
