import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function StudentHeader() {
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
            <div className="mainLogo1">
              <img src="https://i.ibb.co/6yyxLWN/image-9.png" alt="LwB logo" />
            </div>
            <ul className={`navmenu__list ${activeDropdownmenu}`}>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/student/home">
                  Home
                </Link>
              </li>

              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/student/home/videos">
                  Video Lessons
                </Link>
              </li>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/student/home/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item" onClick={closeDropdown}>
                <Link className="nav-link" to="/student/home/quiz">
                  Quizzes
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
          <Link to="/student/home/profile">
          <p className="active-use"> {loggedInUser.userName}</p>
          {loggedInUser.userAvatarImg ? (
            <img src={loggedInUser.userAvatarImg} alt="user avatar image" />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="user avatar image"
            />
          )}
          </Link>
        </div>
      </header>
      <h1 className="companyName">Learning without Borders</h1>
    </>
  );
}

export default StudentHeader;
