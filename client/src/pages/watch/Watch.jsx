import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";
import React, { useEffect, useRef, useState } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import {
  startCapture,
  landmarkProcessor,
  handState,
} from "./MediaPipeController";

import "@vime/core/themes/default.css";

export default function Watch() {
  const location = useLocation();
  console.log(location);
  const movie = location.state.movie;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const updateFist = useRef(null);
  const [timerRunning, setTimerRunning] = useState(false);

  var [fist, setFist] = useState(false);

  const fistProcessor = () => {
    var timeoutID;
    var timer;
    return (state) => {
      if (timer) {
        if (state === false) {
          clearTimeout(timeoutID);
          timer = false;
          setTimerRunning(false);
        }
      } else if (state === true) {
        setTimerRunning(true);
        timer = true;
        timeoutID = setTimeout(() => {
          console.log(`FIST-${timeoutID}`);
          timer = false;
          setTimerRunning(false);
        }, 2000);
      }
    };
  };

  const resultProcessor = (canvas, canvasContext) => (results) => {
    // canvasContext.save();
    // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    // canvasContext.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        // drawConnectors(canvasContext, landmarks, HAND_CONNECTIONS, {
        //   color: "#00FF00",
        //   lineWidth: 5,
        // });
        // drawLandmarks(canvasContext, landmarks, {
        //   color: "#FF0000",
        //   lineWidth: 2,
        // });
        if (landmarkProcessor(landmarks) === handState.FIST) {
          updateFist.current(true);
        } else {
          updateFist.current(false);
        }
      }
    } else {
      updateFist.current(false);
    }
    // canvasContext.restore();
  };

  useEffect(() => {
    canvasContextRef.current = canvasRef.current.getContext("2d");
    startCapture(
      videoRef.current,
      resultProcessor(canvasRef.current, canvasContextRef.current)
    )();
    updateFist.current = fistProcessor();
  }, []);

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackIcon />
          Home
        </div>
      </Link>
      {timerRunning ? (
        <CountdownCircleTimer
          isPlaying
          duration={2}
          colors={["#004777", "#F7B801", "#A30000"]}
          colorsTime={[2, 1, 0]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      ) : null}
      <video hidden autoPlay ref={videoRef} />
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie.video}
      />
      <canvas ref={canvasRef} width={1280} height={720} />
    </div>
  );
}
