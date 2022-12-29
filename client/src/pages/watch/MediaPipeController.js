import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const handOptions = {
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
};

export const startCapture = (video, resultHandler) => () => {
  console.log(video);
  const hands = new Hands({
    locateFile: (file) => {
      return `/@mediapipe/hands/${file}`;
    },
  });
  hands.setOptions(handOptions);
  hands.onResults(resultHandler);

  const camera = new Camera(video, {
    onFrame: async () => {
      await hands.send({ image: video });
    },
    width: 1280,
    height: 720,
  });
  camera.start();
};

export const resultProcessor = (canvas, canvasContext) => (results) => {
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
    }
  }
  canvasContext.restore();
};

export const handState = {
  FIST: "FIST",
  UNKNOWN: "UNKNOWN",
};

export const landmarkProcessor = (landmarks) => {
  if (
    landmarks[8].y > landmarks[6].y &&
    landmarks[12].y > landmarks[10].y &&
    landmarks[16].y > landmarks[14].y &&
    landmarks[20].y > landmarks[18].y
  ) {
    return handState.FIST;
  }
  return handState.UNKNOWN;
};
