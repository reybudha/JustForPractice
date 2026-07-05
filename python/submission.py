import cv2
import mediapipe as mp

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

print("Press 'q' to quit.")

with mp_hands.Hands(max_num_hands=2, min_detection_confidence=0.7, min_tracking_confidence=0.5) as hands:
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        image = cv2.cvtColor
        #Convert BGR (OpenCV) to RGB (MediaPipe expects RGB)(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        
        # Process the image to find hands
        results = hands.process(image)
        
        # Convert back to BGR for drawing
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Draw landmarks if hands are detected
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_draw.draw_landmarks(
                    image, 
                    hand_landmarks, 
                    mp_hands.HAND_CONNECTIONS
                )
                
                # Example: Get coordinates of the index finger tip (Landmark 8)
                index_finger_tip = hand_landmarks.landmark[8]
                h, w, _ = image.shape
                cx, cy = int(index_finger_tip.x * w), int(index_finger_tip.y * h)
                
                # Draw a circle at the index finger tip
                cv2.circle(image, (cx, cy), 15, (255, 0, 0), -1)

        cv2.imshow('Hand Gesture Recognition', image)

        # Break loop on 'q' key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()   