import { Link, Routes, Route } from "react-router-dom";
function TeacherViewContentOptions() {


    return ( <>
    <section className="studentsMainScreen">
      <h1 className="viewAllTitle">View all available Lessons</h1>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/teacher/home/view-content/videos'> 
                <i className="fa-brands fa-youtube icon-studentBlock"></i>
                View All Videos</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to="/teacher/home/view-content/notes" > 
                <i className="fa-solid fa-book-open-reader icon-studentBlock"></i>
                View All Notes</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/teacher/home/view-content/quiz'> 
                <i className="fa-solid fa-circle-question icon-studentBlock"></i>
                View All Quizzes</Link>
            </div>
        </section>
    
    </> );
}

export default TeacherViewContentOptions;