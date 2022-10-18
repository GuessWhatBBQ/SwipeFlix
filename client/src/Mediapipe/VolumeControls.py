import cv2
import mediapipe as mp
import time

#####
cwidth, cheight = 640, 480
#####
cap = cv2.VideoCapture(0)
cap.set(3, cwidth)
cap.set(4, cheight)


detector = htm.HandDetector()

while True:
    # getting the frame
    success, img = cap.read()
    img = cv2.flip(img, 1)

    cv2.imshow("Image", img)
    cv2.waitKey(1)
