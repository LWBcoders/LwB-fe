import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { getStudent, updateStudent } from "../../../api";
import "../../../css/profilePage.css";

function StudentProfile() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [changedDetails, setChangedDetails] = useState(false);
  const [changedPassword, setChangedPassword] = useState(false);
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState(loggedInUser.firstName);
  const [lastname, setLastname] = useState(loggedInUser.lastName);
  const [username, setUsername] = useState(loggedInUser.userName);
  const [avatar, setAvatar] = useState(loggedInUser.userAvatarImg);

  const [error, setError] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);

  function handleChange(event) {
    setPassword(event.target.value);
  }

  function handelFirstname(event) {
    setFirstname(event.target.value);
  }

  function handelLastname(event) {
    setLastname(event.target.value);
  }

  function handelUsername(event) {
    setUsername(event.target.value);
  }

  function handelAvatar(event) {
    setAvatar(event.target.value);
  }

  function handelSubmit(event) {
    event.preventDefault();
    setError();
    setChangedDetails(false);
    const changes = {
      firstName: firstname,
      lastName: lastname,
      userAvatarImg: avatar,
    };
    if (loggedInUser.userName !== username) {
      changes.userName = username;
    }
    updateStudent(loggedInUser._id, changes)
      .then(() => {
        getStudent(loggedInUser._id).then((response) => {
          const user = {
            _id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            userName: response.userName,
            userAvatarImg: response.userAvatarImg,
          };
          setLoggedInUser(user);
          setChangedDetails(true);
        });
      })
      .catch((error) => {
        setError(error.response.data.message);
        setChangedDetails(false);
      });
  }

  function handelPassword(event) {
    event.preventDefault();
    setChangedPassword(false)
    const passwordData = { userPassword: password };
    updateStudent(loggedInUser._id, passwordData).then(() => {
      setChangedPassword(true);
    });
  }
  return (
    <>
      <div className="profile-form-wrapper">
      <h2> My Profile</h2>
      <img className="currentAvatar" src={avatar} alt="profile avatar" />
      <form className="profileForm" onSubmit={handelSubmit}>
        <div className="labelInput-wrapper"> 
          <label htmlFor="firstName">Your First Name:</label>
        
          <input
            className="inputFields inputFields1"
            id="firstName"
            value={firstname}
            onChange={handelFirstname}
          />
          </div>
          
          <div className="labelInput-wrapper"> 
          <label htmlFor="lastName">Your Last Name:</label>
         
          <input
            className="inputFields inputFields1"
            id="lastName"
            value={lastname}
            onChange={handelLastname}
          />
          </div>
          
          <div className="labelInput-wrapper"> 
          <label htmlFor="userName">Your Username:</label>
         
          <input
            className="inputFields inputFields1"
            id="userName"
            value={username}
            onChange={handelUsername}
          />
          </div>
          <div className="labelInput-wrapper"> 
          <label htmlFor="userAvatarImg">Your Avatar URL:</label>
         
          <input
            className="inputFields inputFields1"
            id="userAvatarImg"
            value={avatar}
            onChange={handelAvatar}
          />
          </div>
          
          {error ? <p>{error}</p> : null}
          {changedDetails ? <p>Your details have been changed!</p> : null}
          <button className="profileBtn">Make changes</button>
        </form>

        <div className="labelInput-wrapper labelInput-wrapperPass"> 
        <label htmlFor="password">New Password</label>
        <input
          className="inputFields inputFields1"
          id="password"
          value={password}
          onChange={handleChange}
        />
        </div>
        {changedPassword ? <p>Your password has been changed!</p> : null}
        <button className="profileBtn" onClick={handelPassword}>Change password</button>
      </div>
    </>
  );
}

export default StudentProfile;
