import React, {useState, useEffect, useRef} from "react"

const useImage = ({ src }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return loaded
}

const MinigameVideo = ({ src, alt, updateQuestions, loopTimes, pause }) => {
  const { loaded } = useImage({src});
  const iterations = useRef(0);

  const videoEnded = () => {
    if (iterations.current < loopTimes) {
      iterations.current ++;
      var video = document.getElementById('myVideo');
      video.currentTime = 0;
      video.play();
    } else {
      updateQuestions();
      iterations.current = 0;
    }
  }

  useEffect( () => {
    var video = document.getElementById('myVideo');
    if (pause){
      video.pause();
    } else {
      video.play();
    }
  }, [pause])

  return (
    <video
      className={`first-impression-image-act ${loaded}`} alt={alt}
      controls autoPlay={"autoplay"} id="myVideo"
      key={src} onEnded={() => {videoEnded()}}
    >
      <source src={src} type="video/mp4"/>
      This browser doesn't support video tag.
    </video>
  )
}

export default MinigameVideo;
