import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
const APP_ID = "9a856e8086954a67b2e3422ba6868fcd";
const TOKEN =
  "007eJxTYNA/qZmUIvCrMWSBiJRW5+Kpz1ZW9KxpSwpLMZjRoK/OsF6BwTLRwtQs1cLAwszS1CTRzDzJKNXYxMgoKdHMwswiLTlF8fad1IZARgYJRX8WRgYIBPFZGEpSi0sYGACOBhyb";
const CHANNEL = "test";
const client = AgoraRTC.createClient({ mode: `rtc`, codec: `vp8` });
export default function TeacherBroadcast() {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [localScreenTrack, setLocalScreenTrack] = useState(null);
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);
  useEffect(() => {
    if (!loggedInUser) return;
    const joinChannel = async () => {
      try {
        const uid = await client.join(
          APP_ID,
          CHANNEL,
          TOKEN,
          loggedInUser.userName
        );
        const [audioTrack, videoTrack] =
          await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks([audioTrack, videoTrack]);
        const user = { uid, videoTrack, audioTrack };
        setUsers([user]);
        client.publish([audioTrack, videoTrack]);
      } catch (error) {
        console.error("Error joining channel:", error);
      }
    };
    joinChannel();
    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, [loggedInUser]);
  const toggleMic = async (e) => {
    const [audioTrack] = localTracks;
    await audioTrack.setMuted(!audioTrack.muted);
    e.target.innerText = audioTrack.muted ? "Mic on" : "Mic off";
  };
  const toggleVideo = async (e) => {
    const [, videoTrack] = localTracks;
    await videoTrack.setMuted(!videoTrack.muted);
    e.target.innerText = videoTrack.muted ? "Camera on" : "Camera off";
  };
  const toggleScreen = async (e) => {
    try {
      if (!sharingScreen) {
        e.target.innerText = "...Sharing...";
        const screenTrack = await AgoraRTC.createScreenVideoTrack();
        setLocalScreenTrack(screenTrack);
        setSharingScreen(true);
      } else {
        if (localScreenTrack) {
          localScreenTrack.stop();
          localScreenTrack.close();
          setLocalScreenTrack(null);
          setSharingScreen(false);
        }
      }
    } catch (error) {
      console.error("Error toggling screen sharing:", error);
    }
  };
  const leaveStream = () => {
    navigate("/teacher/home");
    window.location.reload();
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
      <button onClick={toggleMic}>
        {localTracks[0]?.muted ? "Mic on" : "Mic off"}{" "}
      </button>
      <button onClick={toggleVideo}>
        {localTracks[1]?.muted ? "Camera on" : "Camera off"}{" "}
      </button>
      <button onClick={toggleScreen}>
        {sharingScreen ? "Stop Sharing" : "Share Screen"}{" "}
      </button>
      <button onClick={leaveStream}>Leave Stream</button>{" "}
    </>
  );
}
