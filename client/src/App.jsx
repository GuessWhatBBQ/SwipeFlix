import React, { useEffect, useRef, useState } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

import "./App.css";

import {
  startCapture,
  resultProcessor,
  landmarkProcessor,
  handState,
} from "./MediaPipeController";

import "@vime/core/themes/default.css";

function App() {
  // /** @type {React.MutableRefObject<HTMLVmPlayerElement>} */
  // const player = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const updateFist = useRef(null);

  var [fist, setFist] = useState(false);

  const fistProcessor = () => {
    var timerRunning = false;
    var timeoutID;
    return (state) => {
      if (timerRunning) {
        if (state === false) {
          clearTimeout(timeoutID);
          timerRunning = false;
        }
      } else if (state === true) {
        timerRunning = true;
        timeoutID = setTimeout(() => {
          console.log(`FIST-${timeoutID}`);
          timerRunning = false;
        }, 1000);
      }
    };
  };

  const resultProcessor = (canvas, canvasContext) => (results) => {
    canvasContext.save();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasContext, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasContext, landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
        if (landmarkProcessor(landmarks) === handState.FIST) {
          updateFist.current(true);
        } else {
          updateFist.current(false);
        }
      }
    }
    canvasContext.restore();
  };

  useEffect(() => {
    canvasContextRef.current = canvasRef.current.getContext("2d");
    startCapture(
      videoRef.current,
      resultProcessor(canvasRef.current, canvasContextRef.current)
    )();
    var global_landmarks = [];
    updateFist.current = fistProcessor();
  }, []);

  return (
    <div className="App">
      <video autoPlay ref={videoRef} />
      <canvas ref={canvasRef} width={1280} height={720} />
    </div>
  );
}

export default App;
