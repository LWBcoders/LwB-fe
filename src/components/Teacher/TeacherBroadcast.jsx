import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

/////////////////// currently hard-set, need to create automatic token generator//////////////////////////////////////
const APP_ID = "9a856e8086954a67b2e3422ba6868fcd";
const TOKEN =
  "007eJxTYNA/qZmUIvCrMWSBiJRW5+Kpz1ZW9KxpSwpLMZjRoK/OsF6BwTLRwtQs1cLAwszS1CTRzDzJKNXYxMgoKdHMwswiLTlF8fad1IZARgYJRX8WRgYIBPFZGEpSi0sYGACOBhyb";
const CHANNEL = "test";
////////////////////////////////////////////////////////////
const client = AgoraRTC.createClient({ mode: `rtc`, codec: `vp8` });

export default function TeacherBroadcast() {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  const toggleMic = async (e) => {
    if (localTracks[0].muted) {
      await localTracks[0].setMuted(false);
      e.target.innerText = "Mic on";
    } else {
      await localTracks[0].setMuted(true);
      e.target.innerText = "Mic off";
    }
  };
  const toggleVideo = async (e) => {
    if (localTracks[1].muted) {
      await localTracks[1].setMuted(false);
      e.target.innerText = "Camera on";
    } else {
      await localTracks[1].setMuted(true);
      e.target.innerText = "Camera off";
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
      <button onClick={toggleMic}>Mic on</button>
      <button onClick={toggleVideo}>Camera Off</button>
      <button
        onClick={() => {
          navigate("/teacher/home");
          window.location.reload();
        }}
      >
        Leave Stream
      </button>
    </>
  );
}
