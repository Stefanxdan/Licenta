import csv
from pykml import parser
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon

cityLabels = {}


def Parse(file):
    with open(file) as f:
        doc = parser.parse(f).getroot().Document

    for pm in doc.Placemark:

        coordsData = str(pm.Polygon.outerBoundaryIs.LinearRing.coordinates).replace("\n", '').replace("\t", '').split(
            " ")
        coordsData.pop()
        coords = []
        for coord in coordsData:
            splited = coord.split(",")
            coords.append((float(splited[1]), float(splited[0])))
        cityLabels[pm.name] = coords


def GetPolyLabel(point):
    for label in cityLabels:
        polygon = Polygon(cityLabels[label])
        if polygon.contains(point):
            return label

    print(point.x, point.y, "nu apartine nimanui")


def UpdateCSV(input):
    output = "DataOutput.csv"
    with open(input, "r") as file, open(output, "w", newline='') as outFile:
        reader = csv.reader(file, delimiter=',')
        writer = csv.writer(outFile, delimiter=',')
        header = next(reader)
        writer.writerow(header)
        for row in reader:
            row[-1] = GetPolyLabel(Point(float(row[-3]), float(row[-2])))
            # print(row)
            writer.writerow([row[0], row[-1]])
        print(reader.line_num, "line was computed")


kml_file = "Cartiere_iasi.kml"
csv_file = "DataInput.csv"

Parse(kml_file)
UpdateCSV(csv_file)

# GetPolyLabel(Point(47.151282, 27.583525))
# point = Point(0.5, 0.5)
# polygon = Polygon([(0, 0), (0, 1), (1, 1), (1, 0)])
# print(polygon.contains(point))
