import cv2
import mediapipe as mp
import time
import numpy as np
import math

import HandTrackingModule as htm

from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

#####
cwidth, cheight = 640, 480
#####
cap = cv2.VideoCapture(0)
cap.set(3, cwidth)
cap.set(4, cheight)

ptime = 0

detector = htm.HandDetector()


devices = AudioUtilities.GetSpeakers()
interface = devices.Activate(
    IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
volume = cast(interface, POINTER(IAudioEndpointVolume))
# volume.GetMute()
# volume.GetMasterVolumeLevel()
minVolume, maxVolume = volume.GetVolumeRange()[0], volume.GetVolumeRange()[1]




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

        #length 25-180
        length = math.hypot(cx8-cx4, cy8-cy4)
        vol = np.interp(length, [20, 170], [minVolume, maxVolume])
        #third party code        
        volume.SetMasterVolumeLevel(vol, None)
        # print(length, vol)

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
