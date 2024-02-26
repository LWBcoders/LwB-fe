import { Link, Routes, Route } from "react-router-dom";
import TeacherSignin from "./TeacherSignin";
import TeacherSignup from "./TeacherSignup";

function Teacher(){
    return(
        <>
        {/* <p>Teacher</p> */}
        {/* <TeacherSignin/> */}
      {/* <div>
        <Link to="/teacher/signin" className="home-button">Teacher Sign In</Link>
        <br></br>
        <Link to="/teacher/signup" className="home-button">Teacher Sign Up</Link>
      </div> */}

      <Routes>
          <Route path="signin" element={<TeacherSignin/>} />
          <Route path="signup" element={< TeacherSignup/>} />
      </Routes>
    </>
    )
}

export default Teacher