import os
import xlrd
from collections import deque

#file is on folder so no need of path
filePath = 'C:/Users/diego/PycharmProjects/textGeoParser/venv/Scripts/CleanUPSites.xlsx'


def main():

    geoData = xlrd.open_workbook(filePath)

    sheet = geoData.sheet_by_index(0)
    streetNumber = []                                                   # array keeping all the stree number store
    streetName = []                                                     # array keeping all the street names store
    city = []                                                           # "      "      "   "    cities store
    state = []                                                          # "      "      "   "    states store
    zipcode = []                                                        # "      "      "   "    zipcodes store
    status = []
    caseType = []

    j = 2                                                               # initial number fot he column that we are retriving the data from

    # data wanted
    # data from column 2 to 7
    # data from row 1 to EOF


    # assingning value to their respective arrays
    for i in range(1,sheet.nrows):

        streetNumber.append(str(sheet.cell_value(i, j)))
        streetName.append(str(sheet.cell_value(i,j + 1)))
        city.append(str(sheet.cell_value(i,j + 2)))
        state.append(str(sheet.cell_value(i,j + 3)))
        zipcode.append(str(sheet.cell_value(i, j + 4)))
        status.append(str(sheet.cell_value(i, j + 9)))
        caseType.append(str(sheet.cell_value(i, j + 8)))


    # getting rid of any space in front and at the end
    spaceStrip(streetNumber)
    spaceStrip(zipcode)
    spaceStrip(streetName)
    spaceStrip(caseType)

    #gettign index from case type
    makeListCap(caseType)
    militarySiteRemove(streetName, streetNumber, zipcode, caseType, 'MILITARY')


    # things that need to be remove from street names
    thingToRemove('0', streetName)
    thingToRemove(',', streetName)
    thingToRemove('.', streetName)
    thingToRemove('-', streetName)

    # things that need to be remove from zipcodes and fomat of 5 digit per zipcode
    thingTostrip('0', zipcode)
    thingTostrip('.', zipcode)
    thingToRemove('-', zipcode)
    formatZip(zipcode)

    #things to format for the street name
    makeListCap(streetName)
    streetNameFormat(streetName, 'ROAD')
    streetNameFormat(streetName, 'AVENUE')
    streetNameFormat(streetName, 'BOULEVARD')
    streetNameFormat(streetName, 'DRIVE')
    streetNameFormat(streetName, 'PARKWAY')
    streetNameFormat(streetName, 'STREET')
    streetNameFormat(streetName, 'HIGHWAY')
    streetNameFormat(streetName, 'WEST')
    streetNameFormat(streetName, 'EAST')
    streetNameFormat(streetName, 'NORTH')
    streetNameFormat(streetName, 'SOUTH')

    # putting west south north and east in the front if they are in the back
    switchToFront(streetName, 'N')
    switchToFront(streetName, 'S')
    switchToFront(streetName, 'W')
    switchToFront(streetName, 'E')



    # things that need to be remove from zipcodes and some format
    thingTostrip('0', streetNumber)
    thingTostrip('.', streetNumber)
    thingTostrip('-', streetNumber)

    formatStreetNum(streetNumber, streetName, zipcode, ',')
    formatStreetNum(streetNumber, streetName, zipcode, '&')
    formatStreetNum(streetNumber, streetName, zipcode, 'and')
    formatStreetNum(streetNumber, streetName, zipcode, 'AND')
    formatStreetNum(streetNumber, streetName, zipcode, ';')
    spaceStrip(streetNumber)
    removingDash(streetNumber, streetName, zipcode, '-')

    writeToCVS (streetName, streetNumber, zipcode)

    printFunct(caseType)
    #print(len(streetName))
    #print(len(streetNumber))
    #print(len(zipcode))


# to remove anything from the list
def thingToRemove(removeItem, street):


    # zeros on the beginnig of numbered streets needs to be removed
    # reason for the special code
    if removeItem == '0':
        for i in range(len(street)):
            temp = street[i].split()
            for j in range(len(temp)):
                if removeItem in temp[j]:
                    temp[j] = temp[j].lstrip(removeItem)
            street[i] = ' '.join(temp)
    else:
        for i in range(len(street)):
            if removeItem in street[i]:
                street[i] = street[i].replace(removeItem,'')

# gets rid of all leading spaces and trailing spaces so it easier to compare
def spaceStrip(street):

    for i in range(len(street)):
        street[i] = street[i].strip()


def thingTostrip(removeItem, street):

    # stripping zeros at the end of the zipcodes and .
    for i in range(len(street)):
        if removeItem in street[i]:
            street[i] = street[i].rstrip(removeItem)


# making sure that zipcodes are no longer than 5 digits long
def formatZip(street):

    for i in range(len(street)):
        if len(street[i]) > 5:
            street[i] = street[i][:5]

# making sure that street numbers with , - or & symbolas are sparated into their own address
def formatStreetNum(street, name, zipcode, operator):


        for i in range(len(street)):
            if operator in street[i]:
                temp = street[i].split(operator)



                for j in range(len(temp)):
                        street.append(temp[j])      # appending all the elments needed at the end of the list
                        name.append(name[i])        # with the appropiate street name
                        zipcode.append(zipcode[i])  # and zipcode

                street.pop(i)                       # deleting that element from the list that has the , or the and or &
                name.pop(i)                         # with the appropiate street name
                zipcode.pop(i)                      # and zipcode

#deletes military site from the list
def militarySiteRemove(street, number, zipcode, casetype, notwanted ):
    indexToDelete = []
    indexToDelete = searchIndex(notwanted, casetype)

    for i in range(len(indexToDelete)):
        street.pop(indexToDelete[i] - i)
        number.pop(indexToDelete[i] - i)
        zipcode.pop(indexToDelete[i] - i)
        casetype.pop(indexToDelete[i] - i)



def searchIndex(notWanted, caseType):

    indexe = []
    for i in range(len(caseType)):
        if notWanted in caseType[i]:
            indexe.append(i)

    return indexe

# amplifies the list by adding the numbers in between
def removingDash (street, name, zipcode, operator):

        flagForBldg = 0

        for i in range(len(street)):

            if operator in street[i]:


                temp = street[i].split(operator)



                if (intOrNo(temp[0])) and (intOrNo(temp[1])):
                        first = int(temp[0])
                        second = int(temp[1])

                        if (first - second) < 0:        #checking whcih is higher if the first number or second
                            count = second - first + 1
                            for t in range(count):      # adding all the number in between to the list

                                    street.append(str(first))
                                    first += 1
                                    name.append(name[i])    # with the appropiate street name and zipcode
                                    zipcode.append(name[i])
                        else:
                            count = first - second + 1
                            for t in range(count):      # adding all the number in between to the list

                                    street.append(str(second))
                                    second += 1
                                    name.append(name[i])    # with the appropiate street name and zipcode
                                    zipcode.append(name[i])


                        street.pop(i)
                        name.pop(i)
                        zipcode.pop(i)








# format of the street names
def streetNameFormat(street, replace):


    for i in range(len(street)):

        temp = street[i].split()
        for j in range(len(temp)):
            if (replace == 'ROAD') and (temp[j] == replace):     # chcking what operator im sending and making sure that
                temp[j] = 'RD'                                   # the word is in the sentence by it self and not in
                street[i] = ' '.join(temp)                       # conjunction with toher words.
            elif (replace == 'AVENUE') and (temp[j] == replace): # then substituing it with the right abbreviation
                temp[j] = 'AVE'
                street[i] = ' '.join(temp)
            elif (replace == 'BOULEVARD') and (temp[j] == replace or temp[j] == 'BOULEVARDE'):
                temp[j] = 'BLVD'
                street[i] = ' '.join(temp)
            elif (replace == 'DRIVE') and (temp[j] == replace):
                temp[j] = 'DR'
                street[i] = ' '.join(temp)
            elif (replace == 'PARKWAY') and (temp[j] == replace):
                temp[j] = 'PKWY'
                street[i] = ' '.join(temp)
            elif (replace == 'HIGHWAY') and (temp[j] == replace):
                temp[j] = 'HWY'
                street[i] = ' '.join(temp)
            elif (replace == 'STREET') and (temp[j] == replace):
                temp[j] = 'ST'
                street[i] = ' '.join(temp)
            elif (replace == 'SOUTH') and (temp[j] == replace):
                temp[j] = 'S'
                street[i] = ' '.join(temp)
            elif (replace == 'NORTH') and (temp[j] == replace):
                temp[j] = 'N'
                street[i] = ' '.join(temp)
            elif (replace == 'WEST') and (temp[j] == replace):
                temp[j] = 'W'
                street[i] = ' '.join(temp)
            elif (replace == 'EAST') and (temp[j] == replace):
                temp[j] = 'E'
                street[i] = ' '.join(temp)

# moving the indicaotrs to the front if they on the back
def switchToFront(street, indicators):

    for i in range(len(street)):
        temp = street[i].split()
        for j in range(len(temp)):
            if (temp[j] == indicators) and (j != 0):
                if temp[j - 1] != 'AND' and temp[j-1] != '&' and temp[j-1] != 'OF' and temp[j-1] != 'STR' \
                        and temp[j-1] != 'W' and temp[j-1] != 'E' and temp[j-1] != 'S' and temp[j-1] != 'N'\
                        and temp[j-1] != 'C':
                    for t in range(j):
                        holder =  temp[j - t - 1]
                        temp[j - t - 1] = temp[j - t]
                        temp[j - t] = holder
        street[i] = ' '.join(temp)


def intOrNo (street):   # checks if the string is an integer or no
    try:
        int(street)
        return True
    except ValueError:
        return False


def makeListCap(street): # makes every string in a list capitalize
    for i in range(len(street)):
        street[i] = street[i].upper()

def printFunct(listToPrint):

    for i in range(len(listToPrint)):
        print(listToPrint[i])


# writes the zipcode street anme and adrress in to a cvs file
def writeToCVS (streetName, streetNum, zip):

    entries = []

    for i in range(len(streetName)):
        entry = streetNum[i] + ', ' + streetName[i] + ', ' + zip[i] + '\n'

        entries.append(entry)

    f = open('geoLAaddresses.csv', 'w', encoding='utf-8')
    headers = 'Street Number, Street Name, Zipcode\n'
    f.write(headers)
    for i in range(len(entries)):
        f.write(entries[i])
    f.close()


main()
