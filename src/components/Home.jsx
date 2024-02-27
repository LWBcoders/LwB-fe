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
         {/* <h1 className="companyName homePageCompanyName">Learning without Borders</h1> */}
         {/* <img className="logoImg" src="./src/public/Frame1.png" alt="Learning without Borders log" /> */}
         <img className="logoImgHome" src="/Frame2.png" alt="Learning without Borders log" />
        <section className="main-firstPage">

            <div className="main-teacherWrapper">
            <Link className="main-firstPage-link" to="/teacher/signin" >Teacher</Link>
            </div>

            <div className="main-studentWrapper">
            <Link className="main-firstPage-link" to="/student/signin" > Student</Link>

            </div>
        
          
        
        </section>
        </main>
    )
}

export default Home