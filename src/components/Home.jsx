import { Link } from "react-router-dom";

function Home(){
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