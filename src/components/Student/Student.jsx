import { Link, Routes, Route } from "react-router-dom";
import StudentSignin from "./StudentSignin";
import StudentSignup from "./StudentSignup";

function Student(){
    return(
        <>
        <p>student</p>
        <div>
        <Link to="/student/signin" className="home-button">Student Sign In</Link>
        <br></br>
        <Link to="/student/signup" className="home-button">Student Sign Up</Link>
      </div>

      <Routes>
        <Route path="signin" element={<StudentSignin/>} />
        <Route path="signup" element={<StudentSignup/>} />
      </Routes>
        </>
    )
}

export default Student