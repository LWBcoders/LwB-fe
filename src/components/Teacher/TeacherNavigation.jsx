import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function TeacherNavigation() {
    return ( 
        <section className="studentsMainScreen">
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/teacher/home/calender'> <i className="fa-regular fa-calendar-days icon-studentBlock"></i> Calender of Events</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/teacher/home/add-lesson'><i className="fa-brands fa-youtube icon-studentBlock"></i> Add Lessons</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/teacher/home/live'> <i className="fa-solid fa-book-open-reader icon-studentBlock"></i> Go Live</Link>
            </div>
            <div className="studentblock-wrapper">
                <Link className="studentblock-item" to='/teacher/home/view-content'><i className="fa-solid fa-circle-question icon-studentBlock"></i> View My Lessons</Link>
            </div>
          

        </section>
     );
}

export default TeacherNavigation;