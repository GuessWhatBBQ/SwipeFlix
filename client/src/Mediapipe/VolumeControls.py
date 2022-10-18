import cv2
import mediapipe as mp
import time
import math

import HandTrackingModule as htm


#####
cwidth, cheight = 640, 480
#####
cap = cv2.VideoCapture(0)
cap.set(3, cwidth)
cap.set(4, cheight)

ptime = 0

detector = htm.HandDetector()

while True:
    # getting the frame
    success, img = cap.read()
    img = cv2.flip(img, 1)
    img = detector.drawLandmarksOnHands(img)
    lmlist = detector.findPositionOfHands(img, draw=False)
    if len(lmlist) != 0:
        # print(lmlist[4])
        cx4, cy4 = lmlist[4][1], lmlist[4][2]
        cx8, cy8 = lmlist[8][1], lmlist[8][2]
        cv2.circle(img, (cx4, cy4), 5, (255, 0, 0), cv2.FILLED)
        cv2.circle(img, (cx8, cy8), 5, (255, 0, 0), cv2.FILLED)

        length = math.hypot(cx8-cx4, cy8-cy4)
        print(length)
        if(length <30):
            cv2.circle(img, (cx4, cy4), 5, (0, 255, 0), cv2.FILLED)
            cv2.circle(img, (cx8, cy8), 5, (0, 255, 0), cv2.FILLED)

    #getting fps
    ctime = time.time()
    frame_rate = 1/(ctime - ptime)
    ptime = ctime

    cv2.putText(img, f'FPS: {int(frame_rate)}', (10, 30), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 0), 1)
    cv2.imshow("Image", img)
    cv2.waitKey(1)
