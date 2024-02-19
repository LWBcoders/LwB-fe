import { useEffect, useState, useRef } from "react";
import "./main.css";
import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://lwb.onrender.com",
});

function Broadcast() {
  const [stream, setStream] = useState(null);
  const [audio, setAudio] = useState(null);
  const [mixedStream, setMixedStream] = useState(null);
  let chunks = [];
  const [recorder, setRecorder] = useState(null);
  const [startButton, setStartButton] = useState(true);
  const [stopButton, setStopButton] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [isRecording, setIsRecording] = useState(true);

  const recordedVideo = useRef(null);
  const downloadButton = useRef(null);

  async function setupStream() {
    try {
      setupVideoFeedback();
    } catch (err) {
      console.error(err);
    }
  }

  //shows video
  function setupVideoFeedback() {
    if (stream) {
      const video = document.querySelector(".video-feedback");
      video.srcObject = stream;
      video.play();
    } else {
      console.warn("No stream available");
    }
  }

  // start recording
  async function startRecording() {
    await setupStream();

    if (stream && audio) {
      const mixedStreams = new MediaStream([
        ...stream.getTracks(),
        ...audio.getTracks(),
      ]);
      const recorder = new MediaRecorder(mixedStreams);

      recorder.ondataavailable = handleDataAvailable;
      recorder.onstop = handleStop;
      recorder.start(1000);

      setMixedStream(mixedStreams);
      setRecorder(recorder);

      setStartButton(false);
      setStopButton(false);

      setIsRecording(false);

      console.log("Recording started");
    }
  }

  //stop recording
  function stopRecording() {
    recorder.stop();

    setStartButton(false);
    setStopButton(true);
  }

  function handleDataAvailable(e) {
    chunks.push(e.data);
  }

  function handleStop(e) {
    const blob = new Blob(chunks, { type: "video/mp4" });
    chunks = [];

    downloadButton.current.href = URL.createObjectURL(blob);
    downloadButton.current.download = "video.mp4";
    downloadButton.current.disabled = false;

    recordedVideo.current.src = URL.createObjectURL(blob);
    recordedVideo.current.load();
    recordedVideo.current.onloadeddata = function () {
      const rc = document.querySelector(".recorded-video-wrap");
      setIsHidden(false);
      rc.scrollIntoView({ behavior: "smooth", block: "start" });

      recordedVideo.current.play();
    };

    stream.getTracks().forEach((track) => track.stop());
    audio.getTracks().forEach((track) => track.stop());

    setIsRecording(true);

    console.log("Recording stopped");
  }

  useEffect(() => {
    setupVideoFeedback();
  }, [stream]);

  // start live stream
  function startStream() {
    init();
  }

  async function init() {
    try {
      const streams = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const audios = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      const mixedStream = new MediaStream([
        ...streams.getTracks(),
        ...audios.getTracks(),
      ]);
      setStream(streams);
      setAudio(audios);

      document.getElementById("video").srcObject = stream;
      console.log("Streaming started");
      const peer = createPeer();

      mixedStream
        .getTracks()
        .forEach((track) => peer.addTrack(track, mixedStream));

      setStartButton(false);
    } catch (e) {
      console.log(e);
    }
  }

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await baseApi.post("/broadcast", payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  return (
    <>
      <header className="bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-4">
            <h1 className="font-bold ">record screen</h1>
          </div>
        </div>
      </header>

      <main className="overflow-hidden">
        <div className="container mx-auto py-8 px-4">
          <button
            id="start-stream-button"
            className="mx-8 flex-1 bg-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-80 disabled:opacity-50 mb-4"
            onClick={startStream}
          >
            start stream
          </button>
          <h2 className="text-xl text-black-500 uppercase font-light mb-4">
            video
          </h2>
          <p hidden={isRecording}>currently recording</p>

          <video
            id="video"
            autoPlay
            className="video-feedback bg-black w-full h-auto mb-4"
          ></video>

          <div className="flex flex-wrap -mx-4 mb-8">
            <button
              className="start-recording mx-4 flex-1 bg-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-80 disabled:opacity-50"
              onClick={startRecording}
              disabled={startButton}
            >
              start
            </button>
            <button
              className="stop-recording mx-4 flex-1 bg-pink-500 to to-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              onClick={stopRecording}
              disabled={stopButton}
            >
              Stop
            </button>
          </div>

          <div className="recorded-video-wrap" hidden={isHidden}>
            <h2 className="text-xl text-white-500 uppercase font-light mb-4">
              Recorded
            </h2>

            <video
              ref={recordedVideo}
              className="recorded-video bg-black w-full h-auto mb-8"
              controls
            ></video>
            <div className="flex flex-wrap -mx-4">
              <a
                ref={downloadButton}
                className="download-video text-center mx-4 flex-1 bg-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                disabled
              >
                Save
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Broadcast;
