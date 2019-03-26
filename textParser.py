
import os



filePath = 'C:/Users/diego/PycharmProjects/textParser/venv'
fileName = os.path.join(filePath, 'ExampleCoStar.txt')


def main():

    toRemoveFrom = []
    # words form where the string is going to be cut
    toRemoveFrom.append('Sale Price')
    toRemoveFrom.append('Price/AC')
    toRemoveFrom.append('Price/SF')
    toRemoveFrom.append('Price/Room')
    toRemoveFrom.append('Price/Unit')
    toRemoveFrom.append('Cap Rate')
    toRemoveFrom.append('Parcel Size')
    toRemoveFrom.append('Sale Type')
    toRemoveFrom.append('Proposed Use')
    toRemoveFrom.append('Annual % Occup')
    toRemoveFrom.append('Building Size')


    with open('ExampleCoStar.txt', 'r') as f_in:    # deletes all new lines in the file
        data = (line.rstrip() for line in f_in)
        data = list(line for line in data if line)  # converts it back to a list

    for i in range(len(data)):                      # loop for getting the indexes of the following information
        leadingSpace = len(data[i]) - len(data[i].strip())
        if leadingSpace > 10:                       # 2/15/2019 to remove
            data[i] = data[i].strip()

    removeBottomRightCornerInfo(data)

    removingPartOfSting(toRemoveFrom, data)

    with open('modifyCostarData.txt', 'w') as f_in:
        for i in range(len(data)):
            f_in.write(data[i])
            f_in.write('\n')



def removeBottomRightCornerInfo(data):              # function to remove unwanted data or not needed in the list
                                                    # i.e 2/15/2019, page number and copyrigth information
    valueTobeRemove = '2/15/2019'

    while valueTobeRemove in data:
        index = data.index(valueTobeRemove)

        for i in range (3):
            del data[index + 1]
        data.remove(valueTobeRemove)


def removingPartOfSting(toRemoveFrom, data):        # removes the left side of the data that is not necessary

    for j in range(len(data)):                      # goes thru the data and checks for the specific separators
        for i in range(len(toRemoveFrom)):          # that are contain in the list of toRemoveFrom
            if toRemoveFrom[i] in data[j]:          # checks if separator is in the string coin in the list of data
                f = data[j].find(toRemoveFrom[i])   # if its there the it will cut the string in 3 parts the
                head, sep, tail = data[j].partition(toRemoveFrom[i])
                data[j] = head                      # separator, the head which is the part that we want and the tail
                                                    # which is the part that we wish to remove.


main()