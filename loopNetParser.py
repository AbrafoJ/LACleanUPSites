import os
import re

# Regular Expressions (Scratchwork):
# Enumerator: "\d(\d*). "
# State and Zip: "CA \d\d\d\d\d"
# Street Number and Street: "(\d\d*)(.*)(Street|street|STREET|St|st|Avenue|avenue|Ave|ave)"


# All of our desired regular expression statements are defined here.
rx_dict = {
    'enumerator': re.compile(r'(?P<enumerator>\d(\d*)\. )'),
    'stateANDzip': re.compile(r'(?P<stateANDzip>CA \d\d\d\d\d)'),
    'sNumberANDsName': re.compile(r'(?P<sNumberANDsName>(\d\d*)( )(.*)( )(Street|street|STREET|St|st|'
                                  r'Avenue|avenue|AVENUE|Ave|ave|'
                                  r'Pkwy|pkwy|PKWY|Pky|pky|Parkway|parkway|'
                                  r'Road|road|ROAD|Rd|rd|'
                                  r'Place|place|pl|PL|'
                                  r'Boulevard|boulevard|Blvd|blvd|'
                                  r'Hwy|Highway|highway|'
                                  r'Dr|Drive|drive))'),
    'DashsNumberANDsName': re.compile(r'(?P<DashsNumberANDsName>(\d\d*-\d\d*)( )(.*)( )(Street|street|STREET|St|st|'
                                  r'Avenue|avenue|AVENUE|Ave|ave|'
                                  r'Pkwy|pkwy|PKWY|Pky|pky|Parkway|parkway|'
                                  r'Road|road|ROAD|Rd|rd|'
                                  r'Place|place|pl|PL|'
                                  r'Boulevard|boulevard|Blvd|blvd|'
                                  r'Hwy|Highway|highway|'
                                  r'Dr|Drive|drive))'),
    'number': re.compile(r'(?P<number>\d\d*)'),
    'numDASHnum': re.compile(r'(?P<number>(\d\d*)(-)(\d\d*))'),
    'spacedText': re.compile(r'(?P<spacedText>( )(.*))')
}

# Assess whether any of the contents of "line" match a regular expression defined in rx_dict.
def _parse_line(line):
    """
    Do a regex search against all defined regexes and
    return the key and match result of the first matching regex

    """

    for key, rx in rx_dict.items():
        match = rx.search(line)
        if match:
            return key, match
    # if there are no matches
    return None, None

# Assess whether any of the contents of "line" match a specific regular expression defined in rx_dict.
def _parse_line_specific(line, key):
    for tempKey, rx in rx_dict.items():
        if tempKey == key:
            match = rx.search(line)
            if match:
                return key, match
    # if there are no matches
    return None, None

    match = rx.search(line)
    if match:
        return key, match
    return None, None

entrySet = set()

# Function to handle the parsing of all the raw text files for LoopNet/CoStar data.
def parse_files(filepath):
    # Names of raw text files with LoopNet/CoStar Data.
    textFiles = ['2M-2.05M CoStar 2-15.txt',
                 '2.05M-2.1M CoStar 2-15.txt',
                 '2.1M-2.15M CoStar 2-15.txt',
                 '2.15M-2.175M CoStar 2-15.txt',
                 '2.175M-2.2M CoStar 2-15.txt',
                 '2.2M-3.2M CoStar 2-15.txt',
                 '3.2M-5M CoStar 2-15.txt',
                 '5M-8M CoStar 2-15.txt',
                 '8M-10M CoStar 2-15.txt']
    addressCount = 0
    for specificFile in textFiles:
        fileName_in = os.path.join(filepath, specificFile)
        data = []  # create an empty list to collect the data
        sNumberANDsNames = [] # create an empty list for containing multiple street numbers and names.
        # open the file and read through it line by line
        with open(fileName_in, 'r') as file_object:
            lines = file_object.readlines()
            for i in range(len(lines)):
                key, match = _parse_line(lines[i])
                if key == 'enumerator':
                    addressCount= addressCount+1
                    tempStr = []
                    tempCount = 0
                    num_difference = 0
                    exitKey, exitMatch = _parse_line_specific(lines[i+1], 'enumerator')
                    while (exitKey != 'enumerator') and (i+1 < len(lines)):
                        key, match = _parse_line_specific(lines[i], 'DashsNumberANDsName')
                        if key == 'DashsNumberANDsName':
                            DashsNumberANDsName = match.group('DashsNumberANDsName')
                            baseKey, baseMatch = _parse_line_specific(DashsNumberANDsName, 'number')
                            sNumber = baseMatch.group('number')
                            int_one = int(sNumber)
                            DashsNumberANDsName = DashsNumberANDsName.replace(sNumber+'-','')
                            baseKey, baseMatch = _parse_line_specific(DashsNumberANDsName, 'number')
                            sNumber = baseMatch.group('number')
                            int_two = int(sNumber)
                            num_difference = int_two - int_one
                            sName = DashsNumberANDsName.replace(sNumber, '')
                            for j in range(num_difference+1):
                                tempStr.append(str(int_one+j))
                            tempStr.append(sName)
                            tempCount = tempCount + 1
                        else:
                            key, match = _parse_line_specific(lines[i], 'sNumberANDsName')
                            if key == 'sNumberANDsName':
                                sNumberANDsName = match.group('sNumberANDsName')
                                baseKey, baseMatch = _parse_line_specific(sNumberANDsName, 'number')
                                sNumber = baseMatch.group('number')
                                sName = sNumberANDsName.replace(sNumber, '')
                                tempStr.append(sNumber)
                                tempStr.append(sName)
                                tempCount = tempCount + 1
                        key, match = _parse_line_specific(lines[i], 'stateANDzip')
                        if key == 'stateANDzip':
                            stateANDzip = match.group('stateANDzip')
                            baseKey, baseMatch = _parse_line_specific(stateANDzip, 'spacedText')
                            locationZip = baseMatch.group('spacedText')
                            tempStr.append(locationZip)
                            tempCount = tempCount + 1
                        exitKey, exitMatch =  _parse_line_specific(lines[i+1], 'enumerator')
                        i = i + 1
                    if tempCount == 2:
                        for k in range(num_difference+1):
                            singleEntry = tempStr[k].replace(",","|").upper() + "," + tempStr[num_difference+1].replace(",","|").upper() + "," + tempStr[num_difference+2].replace(",","|").upper() + "\n"
                            print('\t\tEntry Added: ', singleEntry)
                            entrySet.add(singleEntry)
                    print('Listing Number: ', addressCount, '\t', 'Name of File: ', specificFile, '\tLine of file: ', i, '\tFound matches: ', tempCount, '\n')
        file_object.close()

# Function to write all parsed data to an output file.
def writeToOutput(filename_out):
    f = open(filename_out, "w")  # Normal naming convention for a file writer: f
    headers = "Street Number, Street Name, Zipcode\n"
    f.write(headers)
    for entry in entrySet:
        f.write(entry)
    f.close()

# Main function to call all functions.
def main():
    print('In the main...Running parseFile\n')
    # OS Path to raw text files with LoopNet/CoStar Data.
    filePath = '/Users/joseph-vaiz-gomez/Documents/CSULB Documents/Semesters/Spring 2019/CECS 491A/Data/LoopNet/Cost Filtered Listings'
    parse_files(filePath)
    print('parseFile completed!\n')
    outputFileName = "loopNetAddresses.csv"
    print('parseFile completed!\n')
    print('Writing to loopNetAddresses.csv ...\n')
    writeToOutput(outputFileName)
    print('Finished writing to file!\n')


main()