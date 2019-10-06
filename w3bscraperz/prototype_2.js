const fs = require('fs'); // ADDED THIS LINE: fs stands for filesystem, allows writing the data to a text file.
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.loopnet.com/for-sale/los-angeles-ca/1/'

var listing_ids = [];
var listing_count = 0; // ADDED THIS LINE: Provide a general count of the number of listings.

main(url);

//===========================================================================
// func main(): this gets all the 25 raw links from loopnet's 'main' page
// passes all 25 into getDataFromPinProfile
//
// input(s): url to the main loopnet page
// output(s): -
//===========================================================================
async function main(url){
  axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data)

      for( i=1; i<=10; i++){
        var s = 'https://www.loopnet.com/for-sale/los-angeles-ca/'+i+'/'
        console.log(s);

        getDataFromPinProfile(s);
      }
      // $('ol li').each(function () {
      //   const href = $(this).children().attr('href');
      //   //console.log($(this).children().attr('href'));
      //   if (href !== undefined){
      //     //getDataFromPinProfile(href);
      //     console.log('link: ',href);
      //   }
      // })
      //console.log(listing_ids);
    })
    .catch(console.error);
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
  .then(response => {
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
    //console.log(listing_ids);

    // pass IDs for actual scraping of addresses
    for(i=0; i<listing_ids.length; i++){
      getListings(listing_ids[i]);
    }
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
    .then(response => {
        //console.log(url);
        const html = response.data;
        const $ = cheerio.load(html)
        const listing_info = $('body').children().text();
        var textFileData = "\n<START_LOOSE_ID>" + listing_count + "<LOOSE_ID>" + // ADDED THIS LINE: Uses the count number as a "LOOSE_ID" for the entry
          "\n<START_HYPERLINK> " + url + " <END_HYPERLINK>" + // ADDED THIS LINE: Hyperlink, in case we need it later.
          "\n<START_LISTING_INFO>\n" + listing_info + "\n<END_LISTING_INFO>" + // ADDED THIS LINE: The actual listing info, including address.
          "\n<END_LOOSE_ID>" + listing_count + "<LOOSE_ID>" + // ADDED THIS LINE
          "\n<DELIMINATION_TAG>"; // ADDED THIS LINE: Serves as a deliminator in the .txt file when read into Python.
        fs.appendFile('scrape_output.txt', textFileData, (err) => { // ADDED THIS LINE
          if (err) throw err; // ADDED THIS LINE: Throw error if necessary.
        }); // ADDED THIS LINE
        console.log(listing_info);
        listing_count++; // ADDED THIS LINE
    })
    .catch(console.error);
}
