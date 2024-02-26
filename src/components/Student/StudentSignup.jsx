import { useState } from "react";
import { studentSignup } from "../../../api";
import { Link } from "react-router-dom";
import "../../../css/signupStyling.css";

function StudentSignup() {
  const [sFirstname, setSFirstname] = useState("");
  const [sLastname, setSLastname] = useState("");
  const [sUsername, setSUsername] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [sAvatarUrl, setSAvatarUrl] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  function handleFirstname(event) {
    setSFirstname(event.target.value);
  }

  function handleLastname(event) {
    setSLastname(event.target.value);
  }

  function handleUsername(event) {
    setSUsername(event.target.value);
  }

  function handlePassword(event) {
    setSPassword(event.target.value);
  }

  function handleAvatar(event) {
    setSAvatarUrl(event.target.value);
  }

  function postStudent(event) {
    event.preventDefault();
    setIsLoading(true);
    setResponse("");
    setError();
    const details = {
      userName: sUsername,
      firstName: sFirstname,
      lastName: sLastname,
      userPassword: sPassword,
    };
    if (sAvatarUrl !== "") {
      details.userAvatarImg = sAvatarUrl;
    }

    studentSignup(details)
      .then((response) => {
        setResponse(response);
      })
      .then(() => {
        setSuccess(true);
        setIsLoading(false);
        setSFirstname("");
        setSLastname("");
        setSUsername("");
        setSPassword("");
        setSAvatarUrl("");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSFirstname("");
        setSLastname("");
        setSUsername("");
        setSPassword("");
        setSAvatarUrl("");
      });
  }

  return (
    <>
    <h1 className="companyName homePageCompanyName companyNameForms">Learning without Borders</h1>
      <div className="authenFormWrapper">
        <h2 className="formName">Welcome! Sign Up</h2>
        {/* <p className=“descriptionForm”>We’re almost done. Before using our services you need to create an account</p> */}
        <form className="registrationForm" onSubmit={postStudent}>
          <label htmlFor="firstName"></label>
          <input
            className="inputFields"
            type="text"
            placeholder="First Name"
            id="firstName"
            onChange={handleFirstname}
            value={sFirstname}
            required
          />
          <label htmlFor="lastName"></label>
          <input
            className="inputFields"
            placeholder="Last Name"
            type="text"
            id="lastName"
            onChange={handleLastname}
            value={sLastname}
            required
          />
          <label htmlFor="userName"></label>
          <input
            className="inputFields"
            type="text"
            placeholder="Username"
            id="userName"
            onChange={handleUsername}
            value={sUsername}
            required
          />
          <label htmlFor="password"></label>
          <input
            className="inputFields"
            placeholder="Password"
            type="password"
            id="password"
            onChange={handlePassword}
            value={sPassword}
            required
          />
          <label htmlFor="avatar”"></label>
          <input
            className="inputFields"
            type="text"
            id="avatar"
            onChange={handleAvatar}
            value={sAvatarUrl}
            placeholder="Profile Avatar URL"
          />
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <>
              {error ? <p>{error}</p> : <p>{response}</p>}
              {success ? <p>Please sign in!</p> : null}
            </>
          )}
          <button disabled={success} className="joinBtn">
            JOIN
          </button>

          <Link className="linkDontHaveAccount" to="/student/signin">Already have an account? Sign in!</Link>
        </form>
      </div>
    </>
  );
}

export default StudentSignup;
