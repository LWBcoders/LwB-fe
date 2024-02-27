import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function TeacherHeader() {
  const [activeClass, setActiveClass] = useState(null);
  const [activeDropdownmenu, setActiveDropdownmenu] = useState(null);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);

  const handleBurger = (e) => {
    e.preventDefault();
    if (activeClass) {
      setActiveClass(null);
      setActiveDropdownmenu(null);
    } else {
      setActiveClass("menu-btn_active");
      setActiveDropdownmenu("navmenu__list-active");
    }
  };
  const closeDropdown = (e) => {
    e.preventDefault();
    setActiveDropdownmenu(null);
    setActiveClass(null);
  };
  return (
    <>
      <header>
        <div className="left-side">
          <nav className="navmenu">
            <div className="hamburger">
              <div className={`menu-btn ${activeClass}`} onClick={handleBurger}>
                <span className="bar"></span>
              </div>
            </div>
            <div className="mainLogo">
<<<<<<< HEAD
              <img src="https://i.ibb.co/6yyxLWN/image-9.png" alt="LwB logo" />
=======
              <img src="../../../public/logo1.png" alt="LwB logo" />
>>>>>>> 015cbd9e84b298c1ae080114689e6c9b28cddfeb
            </div>
            <ul className={`navmenu__list ${activeDropdownmenu}`}>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/teacher/home">
                  Main
                </Link>
              </li>

              <li className="nav-item" onClick={closeDropdown}>
<<<<<<< HEAD
                <Link className="nav-link" to="/teacher/home/view-my-content">
=======
                <Link className="nav-link" to="/add-quiz">
>>>>>>> 015cbd9e84b298c1ae080114689e6c9b28cddfeb
                  My Lessons
                </Link>
              </li>
              <li className="nav-item" onClick={closeDropdown}>
<<<<<<< HEAD
                <Link className="nav-link" to="/teacher/home/add-lesson">
                  Add new Lesson
=======
                <Link className="nav-link" to="/quiz">
                  All Quizzes
>>>>>>> 015cbd9e84b298c1ae080114689e6c9b28cddfeb
                </Link>
              </li>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link sign-out" to="/">
                  Sign out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="right-side">
          <p className="active-use"> {loggedInUser.userName}</p>
        </div>
      </header>
      <h1 className="companyName">Learning without Borders</h1>
    </>
  );
}

export default TeacherHeader;
