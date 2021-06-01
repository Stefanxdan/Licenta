import csv

import pyodbc
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=DESKTOP-U2RTJN0\SQLEXPRESS;'
                      'Database=WebApiDb;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
#cursor.execute("update [WebApiDb].[dbo].[Posts] set City_label='" + Alexandru cel bun + "' where Id='50620E02-5701-4C2C-5459-08D9243EA812'")


file = "DataOutput.csv"
with open(file, "r") as file:
    reader = csv.reader(file, delimiter=',')
    header = next(reader)
    for row in reader:
        cursor.execute("update [WebApiDb].[dbo].[Posts] set City_label='" + row[1] + "' where Id='" + row[0] + "'")
    print(reader.line_num, "line was computed")

conn.commit()
