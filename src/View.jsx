import axios from 'axios';
import { useRef } from 'react';

const baseApi = axios.create({
  baseURL: "https://lwb.onrender.com",
});

function View() {
    const videoRef = useRef();

    function viewStream (){
      console.log("viewing")
      init()
    }

    async function init() {
      const peer = createPeer();
      peer.addTransceiver("video", { direction: "recvonly" })
      peer.addTransceiver("audio", { direction: "recvonly" })
  }
  
    function createPeer() {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                }
            ]
        });
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
      
        return peer;
    }

    async function handleNegotiationNeededEvent(peer) {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      const payload = {
          sdp: peer.localDescription
      };
  
     try {
            const { data } = await baseApi.post('/consumer', payload);
            const desc = new RTCSessionDescription(data.sdp);
            await peer.setRemoteDescription(desc);
        } catch (e) {
            console.log(e);
        }
  }

  function handleTrackEvent(e) {

    videoRef.current.srcObject = e.streams[0];
    // document.getElementById("video").srcObject = e.streams[0];
       
  }

  return (
    <div>
      <h1>Viewer</h1>
      <video id="video" autoPlay ref={videoRef} controls></video>
      <button id="view-stream" onClick={viewStream}>View Stream</button>
    </div>
  );
}


export default View