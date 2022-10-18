import cv2
import mediapipe as mp
import time

class HandDetector():
    def __init__(self, static_image_mode=False,
               max_num_hands=2,
               model_complexity=1,
               min_detection_confidence=0.6,
               min_tracking_confidence=0.5):

        # formality
        self.mpHands = mp.solutions.hands
        # creating hand object
        self.hands = self.mpHands.Hands(static_image_mode, max_num_hands, model_complexity, min_detection_confidence, min_tracking_confidence)
        # for drawing
        self.mpDraw = mp.solutions.drawing_utils

    def drawLandmarksOnHands(self, img, draw=True):
        # converting img to RGB image
        RGBimg = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        # can only process RGB image
        self.result = self.hands.process(RGBimg)

        # checks the presence of hands and then draws landmarks (the lines from one point to the other)
        if self.result.multi_hand_landmarks:
            #drawing Landmarks for each hand
            for one_hand in self.result.multi_hand_landmarks:
                if draw:
                    self.mpDraw.draw_landmarks(img, one_hand, self.mpHands.HAND_CONNECTIONS)
        return img

    def findPositionOfHands(self, img, hand_no=0, draw=True):
        lmList = []

        if self.result.multi_hand_landmarks:
            #uses the new hand that is visible on screen
            oneHand = self.result.multi_hand_landmarks[hand_no]
            for id, lm in enumerate(oneHand.landmark):

                # converting to pixels
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                lmList.append([id, cx, cy])
                # grabbing thumb tip
                if draw:
                    cv2.circle(img, (cx, cy), 5, (255, 255, 0), cv2.FILLED)
        return lmList

def main():

    cap = cv2.VideoCapture(0)
    handDetector = HandDetector()
    while True:
        # getting the frame
        success, img = cap.read()
        img = cv2.flip(img, 1)
        img = handDetector.drawLandmarksOnHands(img)

        lmList = handDetector.findPositionOfHands(img)

        if len(lmList) != 0:
            landmark_point = 4
            print(lmList[landmark_point])

        cv2.imshow("Image", img)
        cv2.waitKey(1)

if __name__== "__main__":
    main()