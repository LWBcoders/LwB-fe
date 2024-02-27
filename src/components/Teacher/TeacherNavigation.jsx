import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function TeacherNavigation() {
  return (
    <section className="studentsMainScreen">
      <div className="studentblock-wrapper">
        <Link className="studentblock-item" to="/teacher/home/calendar">
          {" "}
          <i className="fa-regular fa-calendar-days icon-studentBlock"></i>{" "}
          Calendar of Events
        </Link>
      </div>
      <div className="studentblock-wrapper">
        <Link className="studentblock-item" to="/teacher/home/add-lesson">
          <i className="fa-solid fa-graduation-cap icon-studentBlock"></i>
          Add Lessons
        </Link>
      </div>
      <div className="studentblock-wrapper">
        <Link className="studentblock-item" to="/teacher/home/live">
          <i className="fa-solid fa-video icon-studentBlock"></i>
          Go Live
        </Link>
      </div>
      <div className="studentblock-wrapper">
        <Link className="studentblock-item" to="/teacher/home/view-content">
          <i className="fa-solid fa-book icon-studentBlock"></i>
          View All Lessons
        </Link>
      </div>
      <div className="studentblock-wrapper">
        <Link className="studentblock-item" to="/teacher/home/view-my-content">
          <i className="fa-solid fa-book icon-studentBlock"></i>
          View My Lessons
        </Link>
      </div>
    </section>
  );
}

export default TeacherNavigation;
