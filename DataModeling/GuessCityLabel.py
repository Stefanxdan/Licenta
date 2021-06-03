import csv

CityLabels = []


def GetCityLatLong():
    global CityLabels
    inputFile = "CityLatLong.csv"
    with open(inputFile, "r", encoding="utf8") as file:
        reader = csv.reader(file, delimiter=',')
        next(reader)
        CityLabels.append({'city': 'Agronomie', 'lat': 47.1994400024414, 'long': 27.5425451914469})
        for row in reader:
            city = row[0]
            lat = float(row[1])
            long = float(row[2])
            CityLabels.append({'city': city, 'lat': lat, 'long': long})


def FindCityLabel(text):
    lowerText = text.lower()
    for city in CityLabels:
        if city['city'].lower() in lowerText:
            return city
    return 0


def UpdateCSV(inputFile):
    output = "DataOutput.csv"
    with open(inputFile, "r", encoding="utf8") as file, open(output, "w", newline='') as outFile:
        reader = csv.reader(file, delimiter=',')
        writer = csv.writer(outFile, delimiter=',')
        next(reader)
        writer.writerow(["Id", "City_label", 'Latitude', 'Longitude', 'MapRadius'])
        for row in reader:
            city = FindCityLabel(row[1])
            if city:
                writer.writerow([row[0], city['city'], city['lat'], city['long'], 1])
            else:
                city = FindCityLabel(row[2])
                if city:
                    writer.writerow([row[0], city['city'], city['lat'], city['long'], 1])

        print(reader.line_num, "line was computed")


csv_file = "InputUndifinedLabel.csv"
GetCityLatLong()
UpdateCSV(csv_file)
