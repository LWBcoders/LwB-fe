import { Link, Routes, Route } from "react-router-dom";
import TeacherCalender from "./TeacherCalender";
import TeacherBroadcast from "./TeacherBroadcast";

function TeacherHome(){

    return (
        <>
          <p>teacher home </p>
      <Link to="/teacher/home/calender" className="home-button">teacher calender</Link>
      <br></br>
      <Link to="/teacher/home/add-lesson" className="home-button">teacher add lesson</Link>
      <br></br>
      <Link to="/teacher/home/live" className="home-button">teacher go live</Link>

      <Routes>
     <Route path="calender" element={<TeacherCalender/>}/>
     <Route path="live" element={<TeacherBroadcast/>}/>
     </Routes>
        </>
        
        
    )
}

export default TeacherHome