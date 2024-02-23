import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";

function Home(){
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    useEffect(() => {
        setLoggedInUser({});
        localStorage.clear()
      }, []);

    return(<main>
         <h1 className="companyName">Learning without Boarders</h1>
        <section className="main-firstPage">

            <div className="main-teacherWrapper">
            <Link className="main-firstPage-link" to="/teacher" >Teacher</Link>
            </div>

            <div className="main-studentWrapper">
            <Link className="main-firstPage-link" to="/student" > Student</Link>

            </div>
        
          
        
        </section>
        </main>
    )
}

export default Home