import { useState } from "react";
import { teacherSignup } from "../../../api";
import "../../../css/signupStyling.css";
import { Link } from "react-router-dom";

function TeacherSignup() {
  const [tFirstname, setTFirstname] = useState("");
  const [tLastname, setTLastname] = useState("");
  const [tUsername, setTUsername] = useState("");
  const [tPassword, setTPassword] = useState("");
  const [tAvatarUrl, setTAvatarUrl] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  function handleFirstname(event) {
    setTFirstname(event.target.value);
  }

  function handleLastname(event) {
    setTLastname(event.target.value);
  }

  function handleUsername(event) {
    setTUsername(event.target.value);
  }

  function handlePassword(event) {
    setTPassword(event.target.value);
  }

  function handleAvatar(event) {
    setTAvatarUrl(event.target.value);
  }

  function postTeacher(event) {
    event.preventDefault();
    setIsLoading(true);
    setResponse("");
    setError();
    const details = {
      userName: tUsername,
      firstName: tFirstname,
      lastName: tLastname,
      userPassword: tPassword,
    };
    if (tAvatarUrl !== "") {
      details.userAvatarImg = tAvatarUrl;
    }

    teacherSignup(details)
      .then((response) => {
        setResponse(response);
      })
      .then(() => {
        setSuccess(true);
        setIsLoading(false);
        setTFirstname("");
        setTLastname("");
        setTUsername("");
        setTPassword("");
        setTAvatarUrl("");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTFirstname("");
        setTLastname("");
        setTUsername("");
        setTPassword("");
        setTAvatarUrl("");
      });
  }

  return (
    <>
     <h1 className="companyName homePageCompanyName companyNameForms">Learning without Borders</h1>
      <div className="authenFormWrapper ">
        <h2 className="formName">Welcome! Sign Up</h2>
        {/* <p className=“descriptionForm”>We’re almost done. Before using our services you need to create an account</p> */}
        <form className="registrationForm" onSubmit={postTeacher}>
          <label htmlFor="firstName"></label>
          <input
            className="inputFields"
            type="text"
            placeholder="First Name"
            id="firstName"
            onChange={handleFirstname}
            value={tFirstname}
            required
          />
          <label htmlFor="lastName"></label>
          <input
            className="inputFields"
            placeholder="Last Name"
            type="text"
            id="lastName"
            onChange={handleLastname}
            value={tLastname}
            required
          />
          <label htmlFor="userName"></label>
          <input
            className="inputFields"
            type="text"
            placeholder="Username"
            id="userName"
            onChange={handleUsername}
            value={tUsername}
            required
          />
          <label htmlFor="password"></label>
          <input
            className="inputFields"
            placeholder="Password"
            type="password"
            id="password"
            onChange={handlePassword}
            value={tPassword}
            required
          />
          <label htmlFor="avatar”"></label>
          <input
            className="inputFields"
            type="text"
            id="avatar"
            onChange={handleAvatar}
            value={tAvatarUrl}
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

          <Link className="linkDontHaveAccount" to="/teacher/signin">Already have an account? Sign in!</Link>
        </form>
      </div>
    </>
  );
}

export default TeacherSignup;
