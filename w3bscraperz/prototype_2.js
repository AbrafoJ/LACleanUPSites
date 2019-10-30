const fs = require('fs'); // Allows writing the data to a text file.
const axios = require('axios');
const cheerio = require('cheerio');

var listing_ids = [];
var listing_count = 0; // Provide a general count of the number of listings.

main();

//===========================================================================
// func main(): this prepares every page link for most California cities and
// retrieves the real estate data for each of those page links.
//
// input(s): -
// output(s): -
//===========================================================================
async function main(){
      var ca_cities = require("./ca_cities.json"); // Contains CA city & population data.
      city_page_links = getCityPageLinks(ca_cities);
      for(i=0; i<Math.ceil(city_page_links.length/5); i++){
        //Note: 'i' will reach a max of 218 based off of the current dataset.
        setTimeout(getCityPages, 2000*i, city_page_links.slice(i*5, i*5+5)); // Retrieve every 5 pages 2 seconds apart.
        // **** WARNING: Removing this break will cause the program to take at least 7 minutes to run. Also it may ****
        // **** prompt loopnet to block out the machine running this script. Untested.                             ****
        if(i>50){ // Works for max i: 10, 20, 30, 40, 50 (Got locked out once).
          break;
        }
      }
}

//===========================================================================
// func getCityPageLinks(): Given a JS object consisting of CA cities and
// their corresponding populations, it generates an array of hyperlinks for
// every page available for every CA city. Ordered from the city with highest
// population to that with the lowest.
//
// input(s): JS object of CA city data
// output(s): JS Array of CA city page links
//===========================================================================
function getCityPageLinks(cities_obj){
  var page_links = [];
  for(i=0; i<cities_obj.length; i++){
    var city_name = "";
    var city_name_arr = cities_obj[i].city.split(" ");
    city_name += city_name_arr[0].toLowerCase();
    if (city_name_arr.length>1){
      for(j=1;j<city_name_arr.length;j++){
        city_name += "-" + city_name_arr[j].toLowerCase();
      }
    }
    // Back of the Envelope Calculation:
    // From looking at the data set (ca_cities.json), it's clear that Los Angeles is the largest city in CA by population. After 
    // looking at the corresponding loopnet page, it can be estimated that about 25 pages are needed to represent a population of 
    // 3990456 (Los Angeles). Therefore, (3990456 people)/(25 pages) = (159618.24 people/page) = 159618 people/page. We can use
    // this to estimate the number of pages required for any city given its population.
    num_pages = Math.ceil(cities_obj[i].population/159618);
    
    for(k=1; k<=num_pages; k++){
      var city_link = "https://www.loopnet.com/for-sale/" + city_name + "-ca/"+k+"/";
      page_links.push(city_link);
    }
  }
  return page_links;
}

//===========================================================================
// func getCityPages(): Initiate the scrape process for 5 city page links
// passed in through an array. This function calls getDataFromPinProfile().
//
// input(s): JS Array of sliced page links
// output(s): -
//===========================================================================
function getCityPages(sliced_page_links){
  for(i=0; i<sliced_page_links.length; i++)
    getDataFromPinProfile(sliced_page_links[i]);
}

//===========================================================================
// func getData(): "initial" scraping round
// this function calls getListings()
//
// input(s): raw url
// output(s): -
//===========================================================================
async function getDataFromPinProfile(url){
  axios.get(url)
  .then(async response => {
    //const html = response.data;
    const $ = cheerio.load(response.data)

    //for each ul, for each li, get its data id
    $('ul li').each(function () {

      //get actual value of id
      const li = $(this).children().first().attr('data-id');

      //clean up
      if(li !== undefined){
        //append id to link
        var s = "https://www.loopnet.com/services/listing/pinprofile/"+li;
        listing_ids.push(s);
      }
    })

    // pass IDs for actual scraping of addresses
    for(i=0; i<listing_ids.length; i++){
      getListings(listing_ids[i]);
    }
    listing_ids = [];
  })
  .catch(console.error);
}

//===========================================================================
// func getListings(): "second" scraping round
//
// input(s): url + appended ID from initial scrape
// output(s): -
//===========================================================================
async function getListings(url){
  //const url2 = listing_ids[1];
  axios.get(url)
    .then(async response => {
        //console.log(url);
        const html = response.data;
        const $ = cheerio.load(html)
        const listing_info = $('body').children().text();
        var textFileData = "\n<START_LOOSE_ID>" + listing_count + "<LOOSE_ID>" + // Uses the count number as a "LOOSE_ID" for the entry
          "\n<START_HYPERLINK> " + url + " <END_HYPERLINK>" + // Hyperlink, in case we need it later.
          "\n<START_LISTING_INFO>\n" + listing_info + "\n<END_LISTING_INFO>" + // The actual listing info, including address.
          "\n<END_LOOSE_ID>" + listing_count + "<LOOSE_ID>" +
          "\n<DELIMINATION_TAG>"; // Serves as a deliminator in the .txt file when read into Python.
        fs.appendFile('scrape_output.txt', textFileData, (err) => { 
          if (err) throw err; // Throw error if necessary.
        });
        console.log(listing_info);
        listing_count++;
    })
    .catch(console.error);
}
