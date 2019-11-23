
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.loopnet.com/for-sale/los-angeles-ca/1/'

var listing_ids = [];

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

      for( i=1; i<=1; i++){
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
        const hyperlink = $('body').data('data-profile-url');
        console.log(hyperlink)
        //console.log(listing_info);
    })
    .catch(console.error);
}
