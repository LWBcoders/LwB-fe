import { Link, Routes, Route } from "react-router-dom";

function StudentSignin (){

    return (
        <>
        <p>student signin </p>
        <Link to="/student/home" className="home-button">Student home</Link>
        </>
         
    )
}

export default StudentSignin

