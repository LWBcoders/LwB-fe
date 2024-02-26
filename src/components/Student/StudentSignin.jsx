import { Link } from "react-router-dom";
import "../../../css/signupStyling.css";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { studentSignin } from "../../../api";

function StudentSignin (){
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [sUsernameLogin, setSUsernameLogin] = useState("");
    const [sPasswordLogin, setSPasswordLogin] = useState("");
    const [error, setError] = useState();
    const [response, setResponse] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
  
    function handleUsername(event) {
      setSUsernameLogin(event.target.value);
    }
    function handlePassword(event) {
      setSPasswordLogin(event.target.value);
    }
  
    function studentLogin(event) {
      event.preventDefault();
      setIsLoading(true);
      const details = {
        userName: sUsernameLogin,
        userPassword: sPasswordLogin,
      };
  
      studentSignin(details)
        .then((response) => {
  
          const user = {
             _id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            userName: response.userName,
            userAvatarImg: response.userAvatarImg,
          }
          setLoggedInUser(user);
          setResponse(`You are now logged in as ${response.userName}`);
          setSuccess(true);
          setIsLoading(false);
          localStorage.setItem("user", JSON.stringify(user))
        })
        .then(() => {
          setSUsernameLogin("");
          setSPasswordLogin("");
        })
        .catch((err) => {
          setIsLoading(false)
          setError(err.response.data.message);
        });
    }
  
  
    return (
      <>
        <div className="authenFormWrapper">
          <h2 className="formName">Welcome! Sign In</h2>
          {/* <p className=“descriptionForm”>We’re almost done. Before using our services you need to create an account</p> */}
          <form className="registrationForm" onSubmit={studentLogin}>
            <label htmlFor="userName"></label>
            <input
              className="inputFields"
              type="text"
              placeholder="Username"
              id="userName"
              onChange={handleUsername}
              value={sUsernameLogin}
              required
            />
            <label htmlFor="password"></label>
            <input
              className="inputFields"
              placeholder="Password"
              type="password"
              id="password"
              onChange={handlePassword}
              value={sPasswordLogin}
              required
            />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>{error ? <p>{error}</p> : <p>{response}</p>}</>
            )}
  
            <button disabled={success} className="joinBtn">
              Login
            </button>
          </form>
          <div hidden={!success}>
          <Link to="/student/home" className="home-button">
            <button className="homeBtn">Home</button>
            </Link>
          </div>
        </div>
        
        </>
         
    )
}

export default StudentSignin
