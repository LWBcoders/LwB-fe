import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVideo , viewVideo} from "../../../api";
import "../../../css/viewVideo.css";


function SingleVideo(){
    const { id } = useParams();
    const [video, setVideo] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    
    useEffect(()=>{
        getVideo(id).then((response)=>{
          setVideo(response)
          setLoading(false);
        })
        .catch((error)=>{
          setError(error.response.data.message);
          console.log(error.response.data.message)
              setLoading(false);
        })
      
      },[id])

      if (loading) {
        return <p>Loading video ...</p>
      }

      if (error) {
        return <p>{error}</p>;
      }
    
      function handleView(){
        viewVideo(video._id).then(()=>{
         
        })
      }
    return(
        <>
        <li className="video-item singleVideWrapper">
          <p id="video-title" className="singlevideo-title">{video.title}</p>
          <video className="singleVideoPlayer" onPlay={handleView} controls height="250px" src={video.url}></video>

            <div className="singleVideoDesc-wrapper"> 
            <div className="singleVideoDetails">
            <p className="video-subject">{video.subject}</p>
            <p className="video-year singlevideo-year">Year {video.year}</p>
          <p className="video-teacher singlevideo-teacher">Teacher: {video.teacher}</p>
          
          
          </div>
            <p className="singleVideo-views"><span className="singleCountViews">{video.views} </span>Views</p>
            </div>
          {/* <VideoComments id={id} video={video} setVideo={setVideo}/> */}
        </li>
        
        </>
    )
}

export default SingleVideo