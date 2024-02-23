import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVideo } from "../../../api";


function SingleVideo(){
    const { id } = useParams();
    const [video, setVideo] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [view, setView] = useState(false)
    
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
    
    return(
        <>
        <li className="video-item">
          <p id="video-title">{video.title}</p>
          <p className="video-teacher">{video.teacher}</p>
          <p className="video-subject">{video.subject}</p>
          <p className="video-year">{video.year}</p>
            <video controls height="250px" src={video.url}></video>
          {/* <VideoComments id={id} video={video} setVideo={setVideo}/> */}
        </li>
        
        </>
    )
}

export default SingleVideo