// StudentViewStream.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer.jsx";

const APP_ID = "9a856e8086954a67b2e3422ba6868fcd";
const TOKEN =
  "007eJxTYNB1l+Z9lmPUGKNafErC56II++JjDFMUv0svVb6wPqq3/6YCg2WihalZqoWBhZmlqUmimXmSUaqxiZFRUqKZhZlFWnLKY5fbqQ2BjAznk3cxMTJAIIjPwlCSWlzCwAAAgyMd7w==";
const CHANNEL = "test";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

export default function StudentViewStream() {
  const [users, setUsers] = useState([]);
  const [cameraStatus, setCameraStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const joinChannel = async () => {
      client.on("user-published", handleUserPublished);
      client.on("user-unpublished", handleUserUnpublished);
      await client.join(APP_ID, CHANNEL, TOKEN, null);
    };

    joinChannel();

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
    };
  }, []);

  const handleUserPublished = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((prevUsers) => [...prevUsers, user]);
      setCameraStatus((prevStatus) => ({
        ...prevStatus,
        [user.uid]: true, // Assume camera is initially on
      }));
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserUnpublished = (user, mediaType) => {
    if (mediaType === "video") {
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      setCameraStatus((prevStatus) => ({
        ...prevStatus,
        [user.uid]: false, // Camera is turned off
      }));
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{}}>
          {users.map((u, index) => (
            <VideoPlayer
              key={u.uid}
              user={u}
              showCamera={index === 0}
              cameraStatus={cameraStatus[u.uid]}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/student/home");
          window.location.reload();
        }}
      >
        Leave Stream
      </button>
    </>
  );
}
