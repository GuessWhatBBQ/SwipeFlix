import cv2
import mediapipe as mp
import time

cap = cv2.VideoCapture(0)

#formality
mpHands = mp.solutions.hands
# creating hand object
hands = mpHands.Hands()
#for drawing
mpDraw = mp.solutions.drawing_utils

while True:
    # getting the frame
    success, img = cap.read()
    img = cv2.flip(img, 1)
    #converting img to RGB image
    RGBimg = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    # can only process RGB image
    result = hands.process(RGBimg)

    # checks the presence of hands and then draws landmarks (the lines from one point to the other)
    if result.multi_hand_landmarks:
        # drawing Landmarks for each hand
        for one_hand in result.multi_hand_landmarks:
            for id, lm in enumerate(one_hand.landmark):

                #converting to pixels
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                #grabbing thumb tip
                if(id ==4):
                    # print(id, lm.x, lm.y)
                    cv2.circle(img, (cx, cy), 25, (255, 255, 0), cv2.FILLED)
            mpDraw.draw_landmarks(img, one_hand, mpHands.HAND_CONNECTIONS)

    cv2.imshow("Image", img)
    cv2.waitKey(1)
