import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";
import "../../../css/addVideo.css";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { addVideo } from "../../../api";

function TeacherAddVideo({ allSubjects, allYears, completed }) {
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [year, setYear] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [dbLoading, setdbLoading] = useState();
  const [videoUploaded, setVideoUploaded] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);

  function addFile(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }

  function upload() {
    setIsUploading(true);
    if (file === null) return;
    const fileRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress = progress.toFixed(2);
        setUploadProgress(progress);
      },
      (error) => {
        console.log("error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          setVideoUploaded(true);
        });
      }
    );
  }

  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function handleYear(event) {
    setYear(event.target.value);
  }
  function handleSubject(event) {
    setSubject(event.target.value);
  }
  function uploadToDatabase(event) {
    event.preventDefault();
    const videoItem = {
      title: title,
      subject: subject,
      teacher: loggedInUser.userName,
      year: year,
      url: url,
    };
    if (videoUploaded) {
      addVideo(videoItem).then(() => {
        setdbLoading(true);
        setSubmit(true);
        setTitle("");
        setSubject("");
        setYear("");
        setTeacher("");
        setFile();
        setUrl("");
        setIsUploading(false);
      }).then(()=>{
        setdbLoading(false);
      })
    }
  }



  return (
    <>
    <div className="formWrapper">
      <h2 className="formName">Upload a video</h2>
      <form onSubmit={uploadToDatabase}>
        <label htmlFor="teachers"></label>
        <input
          className="inputFields"
          disabled
          value={loggedInUser.userName}
        />
        <br></br>
        <label htmlFor="title"></label>
        <input
          className="inputFields"
          type="text"
          placeholder="Title"
          id="title"
          onChange={handleTitle}
          value={title}
          required
        />
        <br></br>
        {completed ? (
          <>
            <label htmlFor="subject"></label>
            <select
              className="drop-down"
              value={subject}
              onChange={handleSubject}
              required
            >
              <option value="" disabled selected>
                Select a subject
              </option>
              {allSubjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <br></br>
            <label htmlFor="years"></label>
            <select
              required
              className="drop-down"
              value={year}
              onChange={handleYear}
            >
              <option value="" disabled selected>
                Select a Year
              </option>
              {allYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* <select
              className="drop-down"
              value={teacher}
              onChange={handleTeacher}
              required
            >
              <option value="" disabled selected>
                Select a Teacher
              </option>
              {allTeachers.map((teacher, index) => (
                <option key={index} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select> */}
            <br></br>
          </>
        ) : null}
        <input required type="file" onChange={addFile} />
        <button className="uploadBtn" onClick={upload}>
          upload
        </button>
        {isUploading ? <p>{uploadProgress}%</p> : null}
        <br></br>
        {dbLoading ? <p>Loading...</p> : null}
        {submit ? <p>Added Successfully</p> : null}
        <button
          disabled={!videoUploaded}
          className="submitButton"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </>
);
}

export default TeacherAddVideo;
