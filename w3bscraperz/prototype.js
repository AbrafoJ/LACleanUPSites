
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.loopnet.com/for-sale/los-angeles-ca/?sk=f35e8fea23610eb8e75b824b755e367a&e=u'

var listing_ids = [];

//===========================================================================
// axios.get() makes the first http request to loopnet 
// "initial" scraping gets all the listing IDs 
// and pushes it into a list (listing_ids)
//
// input(s): url of website we want to scrape from
// output(s): -
//===========================================================================
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
    console.log(listing_ids);

    // pass IDs for actual scraping of addresses
    for(i=0; i<listing_ids.length; i++){
      getData(listing_ids[i]);
    }
  })
  .catch(console.error);

//===========================================================================
// func getData(): "second" scraping round
//
// input(s): url + appended ID from initial scrape
// output(s): -
//===========================================================================
async function getData(url){
  //const url2 = listing_ids[1];
  axios.get(url)
    .then(response => {
        console.log(url);
        const html = response.data;
        const $ = cheerio.load(html)
        const listing_info = $('body').children().text();
        console.log(listing_info);
    })
    .catch(console.error);
}




      // axios(url)
      // .then(response => {

      //   //======================SCRAPE 1=========================
      //   const html = response.data;
      //   const $ = cheerio.load(html)
      //   //const ul = $('ul li');
      //   //console.log(ul);
      //   //const ul = 
      //   //const listing_ids = [];
      //   //$('body').children().text();
      //   console.log($('body').children().text());

      // })
      // .catch(console.error);


    // axios.all( [
    //   axios.get(listing_ids[0]),
    //   axios.get(listing_ids[1]),
    //   axios.get(listing_ids[2]),
    //   axios.get(listing_ids[3]),
    //   axios.get(listing_ids[4]),
    //   axios.get(listing_ids[5]),
    //   axios.get(listing_ids[6]),
    //   axios.get(listing_ids[7]),
    //   axios.get(listing_ids[8]),
    //   axios.get(listing_ids[9]),
    //   axios.get(listing_ids[10])
    //   ]
    // )