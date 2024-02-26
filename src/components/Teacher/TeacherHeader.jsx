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
              <img src="../../../public/logo.png" alt="LwB logo" />
            </div>
            <ul className={`navmenu__list ${activeDropdownmenu}`}>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/teacher/home">
                  Main
                </Link>
              </li>

              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/teacher/home/view-my-content">
                  My Lessons
                </Link>
              </li>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/teacher/home/add-lesson">
                  Add new Lesson
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
