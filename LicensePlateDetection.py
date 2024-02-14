import cv2
import imutils
import numpy as np
import pytesseract
from Creds import TESSRACT_PATH



def ReadImage(file):
    npimg = np.fromstring(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    return img

def LicencePlateDetection(image):
    try:
        Gray_Scale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    except:
        Gray_Scale = image
    bilateralFilter = cv2.bilateralFilter(Gray_Scale, 11, 17, 17)
        
    imageMedian = np.median(image)
    lowerThreshold = max(0, (0.7 * imageMedian))
    upperThreshold = min(255, (0.7 * imageMedian))

    CannyEdged = cv2.Canny(bilateralFilter, lowerThreshold , upperThreshold)
    (cnts, _) = cv2.findContours(CannyEdged, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    
    cnts=sorted(cnts, key = cv2.contourArea, reverse = True)[:]
    for c in cnts:
        perimeter = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * perimeter, True) 
        if (len(approx) == 4):
            Number_Plate_Area = approx
            x,y,w,h = cv2.boundingRect(Number_Plate_Area)
            return (x,y,w,h)    
    return None

def TextExtraction(image, numberPlateArea):
    pytesseract.pytesseract.tesseract_cmd=TESSRACT_PATH

    try:
        Gray_Scale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    except:
        Gray_Scale = image
    x,y,w,h = numberPlateArea
    NumberPlate = Gray_Scale[y:y+h , x:x+w]
    NumberPlate = imutils.resize(NumberPlate, width=500)

    squareKern = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    light = cv2.morphologyEx(NumberPlate, cv2.MORPH_CLOSE, squareKern)
    Bright_NumberPlate = cv2.threshold(light, 0, 255,cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

    licenseNumber = pytesseract.image_to_string(Bright_NumberPlate,'eng','--oem 3 -l eng --psm 6') 
    licenseNumber = "".join([x for x in licenseNumber if str(x).isupper() or str(x).isnumeric()])
    return licenseNumber

def DetectLicencePlate(image):
    numberPlateArea = LicencePlateDetection(image)
    licenseNumber = ""
    if(numberPlateArea!= None):
        print(numberPlateArea)
        licenseNumber = TextExtraction(image, numberPlateArea)
    
    if(licenseNumber==""):
        for i in range(2,5):
            for j in range(1,i):
                if(j>i/2):
                    image1=image[: (image.shape[0] * j) // i ,:]
                if(j<i/2):                
                    image1=image[(image.shape[0] * j )// i: ,:]
                else:
                    image1=image[(image.shape[0] * j )// i : (image.shape[0] * (j+1) ) // i ,:]

                numberPlateArea = LicencePlateDetection(image1)
                if(numberPlateArea!= None):
                    licenseNumber = TextExtraction(image1, numberPlateArea)
                
                if(licenseNumber!=""):
                    break
            if(licenseNumber!=""):
                break
        if(licenseNumber==""):
            licenseNumber = "Detection-failed"
        # print('License_Number =',licenseNumber)
    return licenseNumber
        
   