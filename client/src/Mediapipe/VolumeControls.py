import cv2
import mediapipe as mp
import time


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


    #getting fps
    ctime = time.time()
    frame_rate = 1/(ctime - ptime)
    ptime = ctime

    cv2.putText(img, f'FPS: {int(frame_rate)}', (10, 30), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 0), 1)
    cv2.imshow("Image", img)
    cv2.waitKey(1)
