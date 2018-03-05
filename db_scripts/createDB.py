from datetime import datetime, timedelta
import sqlite3
conn = sqlite3.connect('busbus.db')

##Creates the tables for each stop going ClockWise (odd numbered buses) around campus

#Creates table for Main Entrance bus stop
conn.execute("CREATE TABLE '2375' (busNumber INT, busStopTime TIME)")
	
#Creates table for High and Western Dr bus stop
conn.execute("CREATE TABLE '2374' (busNumber INT, busStopTime TIME)")

#Creates table for Empire Grade bus stop
conn.execute("CREATE TABLE '1385' (busNumber INT, busStopTime TIME)")

#Creates table for Oaks College bus stop
conn.execute("CREATE TABLE '2670' (busNumber INT, busStopTime TIME)")

#Creates table for Rachel Carson and Porter bus stop
conn.execute("CREATE TABLE '2671' (busNumber INT, busStopTime TIME)")

#Creates table for Kerr Hall bus stop
conn.execute("CREATE TABLE '2672' (busNumber INT, busStopTime TIME)")

#Creates table for Kresge College bus stop
conn.execute("CREATE TABLE '2673' (busNumber INT, busStopTime TIME)")

#Creates table for Science Hill bus stop
conn.execute("CREATE TABLE '2674' (busNumber INT, busStopTime TIME)")

#Creates table for College Nine and Ten, Health Center bus stop
conn.execute("CREATE TABLE '2675' (busNumber INT, busStopTime TIME)")

#Creates table for Bookstore, Cowell and Stevenson bus stop
conn.execute("CREATE TABLE '2676' (busNumber INT, busStopTime TIME)")

#Creates table for East Remote Parking bus stop
conn.execute("CREATE TABLE '2677' (busNumber INT, busStopTime TIME)")

#Creates table for The Farm bus stop
conn.execute("CREATE TABLE '2678' (busNumber INT, busStopTime TIME)")

#Creates table for Lower Campus bus stop
conn.execute("CREATE TABLE '2679' (busNumber INT, busStopTime TIME)")


##Stuff that puts all the data into these nice old tables

#Start times for the 15 bus (2375 (Main Entrance))
fifteenStartTimes = ['07:25AM', '07:55AM', '08:25AM', '08:55AM', '09:25AM', '09:55AM', 
	'10:25AM', '10:55AM', '11:25AM', '11:55AM', '12:25PM', '12:55PM', '01:25PM', '01:55PM',
	'02:10PM', '02:25PM', '02:40PM', '02:55PM', '03:10PM', '03:25PM', '03:40PM', '03:55PM',
	'04:10PM', '04:25PM', '04:40PM', '04:55PM', '05:10PM', '05:25PM', '05:55PM', '06:25PM',
	'06:55PM', '07:25PM', '07:55PM']

#Table ID's that correspond to the odd bus route 
oddStopIds = ['2375', '2374', '1385', '2670', '2671', '2672', '2673', 
	'2674', '2675', '2676', '2677', '2678', '2679']

#Time interval between bus stops going Clockwise (Odd numbered buses)
oddTimeIntervals = [0, 1, 2, 5, 6, 7, 7, 8, 9, 10, 	 11, 12, 13]

#puts the times the bus will arive at each bus stop putting into the respective table
for startTime in fifteenStartTimes:
	for index in range(0, len(oddTimeIntervals)):
		#oddStopIds[index] = startTime + oddTimeIntervals[index]
		#converts the time and adds the new time to the bus route 
		timeObject = datetime.strptime(startTime, '%I:%M%p')
		newTime = timeObject + timedelta(minutes = oddTimeIntervals[index])
		newTime.strftime('%I:%M%p')
		currentStopId = oddStopIds[index]
		queryString = "INSERT INTO " + str(oddStopIds[index]) + " VALUES (15, " + str(newTime) + ")"
		conn.execute(queryString)

conn.commit()

c = conn.cursor()

query = "SELECT * FROM '2735'"
c.execute(query)
rows = c.fetchall()
c.close()

print rows




