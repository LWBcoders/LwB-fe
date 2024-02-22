import { Link, Routes, Route } from "react-router-dom";
import TeacherCalender from "./TeacherCalender";
import TeacherBroadcast from "./TeacherBroadcast";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherHeader from "./TeacherHeader";
import TeacherNavigation from "./TeacherNavigation";

function TeacherHome(){

    return (
        <section className="teacherHome">
        <TeacherHeader />

            <Routes>
            <Route path="/" element={<TeacherNavigation />}/>
             <Route path="calender" element={<TeacherCalender/>}/>
            <Route path="live" element={<TeacherBroadcast/>}/>
            <Route path="add-quiz" element={<TeacherAddQuiz/>}/>
     </Routes>


          

     
        </section>
        
        
    )
}

/* <p>teacher home </p>
      <Link to="/teacher/home/calender" className="home-button">teacher calender</Link>
      <br></br>
      <Link to="/teacher/home/add-lesson" className="home-button">teacher add lesson</Link>
      <br></br>
      <Link to="/teacher/home/live" className="home-button">teacher go live</Link>
      <br></br>
      <Link to="/teacher/home/add-quiz" className="home-button">teacher add quiz</Link>
      <br></br>
      <Link to="/teacher/home/view-content" className="home-button">teacher view content</Link> */

export default TeacherHome