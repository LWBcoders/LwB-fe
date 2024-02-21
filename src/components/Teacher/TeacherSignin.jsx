import { Link, Routes, Route } from "react-router-dom";

function TeacherSignin (){

    return (
        <>
        <p>Teacher signin </p>
        <Link to="/teacher/home" className="home-button">teacher home</Link>
        </>
        
    )
}

export default TeacherSignin