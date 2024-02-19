import { Link } from "react-router-dom";

function Home(){
    return(
        <>
        <Link to="/teacher" >Teacher</Link>
            <br></br>
        <Link to="/student" > Student</Link>
        </>
    )
}

export default Home