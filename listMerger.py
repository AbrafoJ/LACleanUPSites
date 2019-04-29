import os
coStarFile = 'loopNetAddresses.csv'
geoTrackerFile = 'geoLAaddresses.csv'

coStarSet = set()
geoTrackerSet = set()

def readCoStarList():
    print('Reading Costar List:\n')
    with open(coStarFile) as csf:
        line = csf.readline()
        count = 1
        while line:
            print("Line {}: {}".format(count, line.strip()))
            coStarSet.add(line.strip())
            line = csf.readline()
            count= count+1
def readGeoTrackerList():
    print('Reading GeoTracker List:\n')
    with open(geoTrackerFile) as gtf:
        line = gtf.readline()
        count = 1
        while line:
            print("Line {}: {}".format(count, line.strip()))
            geoTrackerSet.add(line.strip())
            line = gtf.readline()
            count= count+1

def main():
    readCoStarList()
    readGeoTrackerList()
    mergedList = geoTrackerSet.intersection(coStarSet)
    print('-------------------------------------------------------------------------------\nMerged List:\n')
    for listing in mergedList:
        print(listing)

main()