import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { getTeacher, updateTeacher } from "../../../api";
import "../../../css/profilePage.css"

function TeacherProfile() {
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
    setError()
    setChangedDetails(false);
    const changes = {
      firstName: firstname,
      lastName: lastname,
      userAvatarImg: avatar,
    };
    if (loggedInUser.userName !== username) {
      changes.userName = username;
    }
    updateTeacher(loggedInUser._id, changes)
      .then(() => {
        getTeacher(loggedInUser._id).then((response) => {
          const user = {
            _id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            userName: response.userName,
            userAvatarImg: response.userAvatarImg,
          };
          setLoggedInUser(user); 
          setChangedDetails(true)
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
    updateTeacher(loggedInUser._id, passwordData).then(() => {
      setChangedPassword(true)
    });
  }
  return (
    <>
    <div className="profile-form-wrapper">
      <form onSubmit={handelSubmit}>
        <label htmlFor="firstName">Firstname</label>
        <br></br>
        <input
          className="inputFields"
          id="firstName"
          value={firstname}
          onChange={handelFirstname}
        />
        <br></br>
        <label htmlFor="lastName">Lastname</label>
        <br></br>
        <input
          className="inputFields"
          id="lastName"
          value={lastname}
          onChange={handelLastname}
        />
        <br></br>
        <label htmlFor="userName">Username</label>
        <br></br>
        <input
          className="inputFields"
          id="userName"
          value={username}
          onChange={handelUsername}
        />
        <br></br>
        <label htmlFor="userAvatarImg">Avatar URL</label>
        <br></br>
        <input
          className="inputFields"
          id="userAvatarImg"
          value={avatar}
          onChange={handelAvatar}
        />
        <br></br>
        {error ? <p>{error}</p> : null}
        {changedDetails ? <p>Your details have been changed!</p> : null}
        <button>Make changes</button>
      </form>

      <label htmlFor="password"></label>
      <input
        className="inputFields"
        id="password"
        value={password}
        onChange={handleChange}
      />
      {changedPassword ? <p>Your password has been changed!</p> : null}
      <button onClick={handelPassword}>Change password</button>
      </div>
    </>
  );
}

export default TeacherProfile;
