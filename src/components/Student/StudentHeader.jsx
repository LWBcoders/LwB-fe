import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';

function StudentHeader() {
    const [activeClass, setActiveClass] = useState(null);
    const [activeDropdownmenu, setActiveDropdownmenu] = useState(null)

    const handleBurger = (e)=>{
        e.preventDefault();
        if(activeClass){
            setActiveClass(null)
            setActiveDropdownmenu(null)
        }else{
            setActiveClass('menu-btn_active')
            setActiveDropdownmenu('navmenu__list-active')
        }
    }
    const closeDropdown = (e)=>{
        e.preventDefault();
        setActiveDropdownmenu(null)
        setActiveClass(null)
    }
    return (<>
    <header>
            <div className="left-side">
    
            <nav className="navmenu">

            <div className="hamburger">
                <div className={`menu-btn ${activeClass}`} onClick={handleBurger}>
                <span className="bar"></span>
                </div>
            </div>

                <ul className={`navmenu__list ${activeDropdownmenu}`}>
                <li className="nav-item" onClick={closeDropdown}>
                        <Link className="nav-link" to='/student/home' >Main</Link>
                    </li>

                    <li className="nav-item" onClick={closeDropdown}>
                        <Link className="nav-link" to='/add-quiz' >Settings</Link>
                    </li>
                    <li className="nav-item" onClick={closeDropdown}>
                        <Link className="nav-link" to='/quiz' >All Quizzes</Link>
                    </li>

                </ul>
                
            </nav>
            
            </div>
            {/* <div className="mainLogo"><span>LwB</span> </div> */}
            <div className="right-side">
                <p className="active-use"> Mike</p>
            </div>
            
        </header>
        <h1 className="companyName">Learning without Boarders</h1>
    
    
    
    </>


      );
}

export default StudentHeader;