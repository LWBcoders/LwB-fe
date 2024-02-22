import { Link, Routes, Route } from "react-router-dom";
import TeacherCalender from "./TeacherCalender";
import TeacherBroadcast from "./TeacherBroadcast";
import TeacherAddQuiz from "./TeacherAddQuiz";
import TeacherHeader from "./TeacherHeader";
import TeacherNavigation from "./TeacherNavigation";
import TeacherAddLesson from "./TeacherAddLesson";


function TeacherHome(){

    return (
        <section className="teacherHome">
        <TeacherHeader />

        <Routes>
        <Route path="add-lesson/*" element={<TeacherAddLesson/>}/>
            <Route path="/" element={<TeacherNavigation />}/>
             <Route path="calender" element={<TeacherCalender/>}/>
            <Route path="live" element={<TeacherBroadcast/>}/>
            <Route path="add-quiz" element={<TeacherAddQuiz/>}/>
     </Routes>


          

     
        </section>
        
        
    )
}



export default TeacherHome