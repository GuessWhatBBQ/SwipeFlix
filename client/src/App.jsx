import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

import "@vime/core/themes/default.css";

var fist = false;

function App() {
  // /** @type {React.MutableRefObject<HTMLVmPlayerElement>} */
  // const player = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);

  useEffect(() => {
    canvasContextRef.current = canvasRef.current.getContext("2d");

    const hands = new Hands({
      locateFile: (file) => {
        return `/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(onResults);
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
  }, []);

  const onResults = (results) => {
    canvasContextRef.current.save();
    canvasContextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    canvasContextRef.current.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasContextRef.current, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasContextRef.current, landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
        if (
          landmarks[8].y > landmarks[6].y &&
          landmarks[12].y > landmarks[10].y &&
          landmarks[16].y > landmarks[14].y &&
          landmarks[20].y > landmarks[18].y
        ) {
          setTimeout(() => {
            if (!fist) {
              fist = true;
            }
          }, 1000);
        } else {
          fist = false;
        }
      }
      if (fist) {
        console.log("Fist");
      } else {
        console.log("Not Fist");
      }
    }
    canvasContextRef.current.restore();
  };

  return (
    <div className="App">
      <video autoPlay ref={videoRef} />
      <canvas ref={canvasRef} width={1280} height={720} />
    </div>
  );
}

export default App;
