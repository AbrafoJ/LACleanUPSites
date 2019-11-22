import os
import csv
import json

# Header: Street Number, Street Name, Zipcode, Price
coStarFile = 'scraped_LN_addresses.csv'
# Header: Street Number, Street Name, Zipcode
geoTrackerFile = 'geoLAaddresses.csv'

coStarSet = set()
geoTrackerSet = set()

coStarDict = dict()
geoTrackerDict = dict()

def readCoStarList():
    print('*** Reading Costar List ***')
    with open(coStarFile) as csf:
        csf_reader = csv.reader(csf, delimiter=',')
        first_line = True
        for row in csf_reader:
            if first_line == True:
                print(f'CoStar List Header: {", ".join(row)}')
                first_line = False
            else:
                listing_key = str(row[0])+','+str(row[1])+','+str(row[2])
                coStarSet.add(listing_key)
                listing_items = ''
                for i in range(3, len(row)):
                    if len(row) <= 3:
                        break
                    listing_items += (','+str(row[i]))
                coStarDict[listing_key] = listing_items

def readGeoTrackerList():
    print('*** Reading GeoTracker List ***')
    with open(geoTrackerFile) as gtf:
        gtf_reader = csv.reader(gtf, delimiter=',')
        first_line = True
        for row in gtf_reader:
            if first_line == True:
                print(f'GeoTracker List Header: {", ".join(row)}')
                first_line = False
            else:
                listing_key = str(row[0])+','+str(row[1])+','+str(row[2])
                geoTrackerSet.add(listing_key)
                listing_items = ''
                for i in range(3, len(row)):
                    if len(row) <= 3:
                        break
                    listing_items += (','+str(row[i]))
                geoTrackerDict[listing_key] = listing_items

def main():
    header_list = ['Address_ID','Street_Num','Street_Name','ZIP_Code','Sale_Price','Link']
    json_data = list()

    readCoStarList()
    readGeoTrackerList()
    mergedListKeys = list(geoTrackerSet.intersection(coStarSet))
    print(type(mergedListKeys))
    print('-------------------------------------------------------------------------------\nMerged List:\n')
    for indx in range(len(mergedListKeys)):
        addr_key = mergedListKeys[indx]
        mergedListKeys[indx] = mergedListKeys[indx] + coStarDict[addr_key]
        mergedListKeys[indx] = mergedListKeys[indx] + geoTrackerDict[addr_key]
        mergedListKeys[indx] = str(indx)+', '+mergedListKeys[indx]
        print(mergedListKeys[indx])

        listing_attributes = mergedListKeys[indx].split(',')
        json_data.append({
            header_list[0]:listing_attributes[0].strip(),
            header_list[1]:listing_attributes[1].strip(),
            header_list[2]:listing_attributes[2].strip(),
            header_list[3]:listing_attributes[3].strip(),
            header_list[4]:listing_attributes[4].strip(),
            header_list[5]:listing_attributes[5].strip()
        })
    # Erase the current contents of the file
    open('merged_data.json', 'w').close()
    # Write the listings to the file
    with open('merged_data.json', 'w') as outfile:
        json.dump(json_data, outfile)
main()