# parse_scraped_data.py

# Import the os module for accessing files on the local computer.
import os
# Import the re module to permit the use of regular expressions.
import re
# Import the json module to enable writing to json files.
import json

regex_dict = {
	'hyperlink': re.compile(r'(?P<hyperlink>(<START_HYPERLINK>)(.+)(<END_HYPERLINK>))'),
	'stateANDzip': re.compile(r'(?P<stateANDzip>CA \d\d\d\d\d)'),
    'dashsNumberANDsName': re.compile(r'(?P<dashsNumberANDsName>(\d+-\d+)( )(.*)( )(Street|street|STREET|St|st|'
                                  r'Avenue|avenue|AVENUE|AVE|Ave|ave|'
                                  r'Pkwy|pkwy|PKWY|Pky|pky|Parkway|parkway|'
                                  r'Road|road|ROAD|Rd|rd|'
                                  r'Place|place|Pl|pl|PL|'
                                  r'Boulevard|boulevard|Blvd|blvd|'
                                  r'Hwy|hwy|Highway|highway|'
                                  r'Way|way|Wy|wy|'
                                  r'Dr|dr|Drive|drive))'),
    'sNumberANDsName': re.compile(r'(?P<sNumberANDsName>(\d+)( )(.*)( )(Street|street|STREET|St|st|'
                                  r'Avenue|avenue|AVENUE|AVE|Ave|ave|'
                                  r'Pkwy|pkwy|PKWY|Pky|pky|Parkway|parkway|'
                                  r'Road|road|ROAD|Rd|rd|'
                                  r'Place|place|Pl|pl|PL|'
                                  r'Boulevard|boulevard|Blvd|blvd|'
                                  r'Hwy|hwy|Highway|highway|'
                                  r'Way|way|Wy|wy|'
                                  r'Dr|dr|Drive|drive))'),
    'numDASHnum': re.compile(r'(?P<numDASHnum>(\d\d*)(-)(\d\d*))'),
    'street': re.compile(r'(?P<street>(Street|street|STREET|St|st|'
                                  r'Avenue|avenue|AVENUE|AVE|Ave|ave|'
                                  r'Pkwy|pkwy|PKWY|Pky|pky|Parkway|parkway|'
                                  r'Road|road|ROAD|Rd|rd|'
                                  r'Place|place|Pl|pl|PL|'
                                  r'Boulevard|boulevard|Blvd|blvd|'
                                  r'Hwy|hwy|Highway|highway|'
                                  r'Way|way|Wy|wy|'
                                  r'Dr|dr|Drive|drive))'),
    'price': re.compile(r'(?P<price>\$(\d|\,)+\d)')
}

# Assess whether any of the contents of "line" match a regular expression defined in rx_dict.
def _parse_line(line):
    """
    Do a regex search against all defined regexes and
    return the key and match result of the first matching regex

    """

    for key, rx in regex_dict.items():
        match = rx.search(line)
        if match:
            return key, match
    # if there are no matches
    return None, None

def get_multi_nums(num_dash_num):
	lower_num, higher_num = num_dash_num.split('-')
	lower_num = int(lower_num)
	higher_num = int(higher_num)
	num_list = []
	for i in range(lower_num, higher_num + 1):
		num_list.append(str(i))
	return num_list


def read_scraped_file(filename_in):
	entry_set = set()
	hyperlink = ''
	line_1_info = ''
	zipcode = ''
	price = ''

	street_number = ''
	street_name = ''

	scraped_file = open(filename_in, 'r')
	scraped_content = scraped_file.read()
	scraped_file.close()
	listing_blocks = scraped_content.split('<DELIMINATION_TAG>')
	
	for i in range(len(listing_blocks)):
		block_lines = listing_blocks[i].split('\n')
		for line_indx in range(len(block_lines)):
			block_lines[line_indx] = block_lines[line_indx].strip()
		block_lines = list(filter(None, block_lines)) # Filter out all empty strings of ''.
		for specific_line in block_lines:
			key, match = _parse_line(specific_line)
			if key == 'hyperlink' and hyperlink == '':
				hyperlink = match.group('hyperlink')
				hyperlink = hyperlink.replace('<START_HYPERLINK>', '')
				hyperlink = hyperlink.replace('<END_HYPERLINK>', '')
				hyperlink = hyperlink.strip().replace(",","")
			elif key == 'dashsNumberANDsName' and line_1_info == '':
				line_1_info = match.group('dashsNumberANDsName')
				line_1_info = line_1_info.strip()
				line_1_info = line_1_info.split(' ')
				street_number = line_1_info[0]
				line_1_info.pop(0)
				street_name = ' '.join(line_1_info).replace(",","|").upper()
			elif key == 'sNumberANDsName' and line_1_info == '':
				line_1_info = match.group('sNumberANDsName')
				line_1_info = line_1_info.strip()
				line_1_info = line_1_info.split(' ')
				street_number = line_1_info[0]
				line_1_info.pop(0)
				street_name = ' '.join(line_1_info).replace(",","|").upper()
			elif key == 'stateANDzip' and zipcode == '':
				zipcode = match.group('stateANDzip')
				zipcode = zipcode.strip()
				zipcode = zipcode.replace('CA ', '').replace(",","|")
			elif key == 'price' and price == '':
				price = match.group('price')
				price = price.strip().replace(",","")

		if hyperlink != '' and street_number != '' and street_name != '' and zipcode != '' and price != '':
			if '-' in street_number: # Properties sold with multiple street numbers.
				street_nums = get_multi_nums(street_number) # Get a string list of all integers from street number (first_int-last_int).
				for num in street_nums:
					entry_set.add(num+', '+street_name+', '+zipcode+', '+price+', '+hyperlink+'\n')
			else:
				entry_set.add(street_number+', '+street_name+', '+zipcode+', '+price+', '+hyperlink+'\n')

		hyperlink = ''
		line_1_info = ''
		street_number = ''
		street_name = ''
		zipcode = ''
		price = ''

	return entry_set

def write_to_output(filename_out, listing_set):
    f = open(filename_out, "w")  # Normal naming convention for a file writer: f
    headers = "Street Number, Street Name, Zipcode, Price, Hyperlink\n"
    f.write(headers)
    for entry in listing_set:
        f.write(entry)
    f.close()

def main():
	listings = read_scraped_file('scrape_output.txt')
	write_to_output('scraped_LN_addresses.csv', listings)

main()