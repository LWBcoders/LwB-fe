import { Link, Routes, Route } from "react-router-dom";

function StudentSignup (){

    return (
        <>
        <p>student signup </p>
        <Link to="/student/home" className="home-button">Student home</Link>
        </>
    )
}

export default StudentSignup