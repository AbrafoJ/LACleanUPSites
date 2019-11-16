import os
import csv 

# Header: Street Number, Street Name, Zipcode, Price
coStarFile = 'scraped_LN_addresses.csv'
# Header: Street Number, Street Name, Zipcode
geoTrackerFile = 'geoLAaddresses.csv'

coStarSet = set()
geoTrackerSet = set()

def readCoStarList():
    print('*** Reading Costar List ***')
    with open(coStarFile) as csf:
        csf_reader = csv.reader(csf, delimiter=',')
        line_count = 0
        for row in csf_reader:
            if line_count == 0:
                print(f'CoStar List Header: {", ".join(row)}')
                line_count += 1
            else:
                coStarSet.add(str(row[0])+','+str(row[1])+','+str(row[2]))
                line_count += 1
def readGeoTrackerList():
    print('*** Reading GeoTracker List ***')
    with open(geoTrackerFile) as gtf:
        gtf_reader = csv.reader(gtf, delimiter=',')
        line_count = 0
        for row in gtf_reader:
            if line_count == 0:
                print(f'GeoTracker List Header: {", ".join(row)}')
                line_count += 1
            else:
                geoTrackerSet.add(str(row[0])+','+str(row[1])+','+str(row[2]))
                line_count += 1

def main():
    readCoStarList()
    readGeoTrackerList()
    mergedList = geoTrackerSet.intersection(coStarSet)
    print('-------------------------------------------------------------------------------\nMerged List:\n')
    for listing in mergedList:
        print(listing)

main()
