import axios from "axios";

//var axios = require("axios");

const buildQueryURL = (searchInput,callback) => {
    // queryURL is the url we'll use to query the API
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  
    // add the api key parameter (the one we received when we registered)
    queryURL += "?api-key=ff1dce41b42145738d81d3683d184757";
  
    // grab text the user typed into the search input, add as parameter to url
    let searchTerm = searchInput.topic;
    queryURL += "&q=" + searchTerm;
  
    // if the user provides a startYear, include it in the queryURL
    let startYear = searchInput.startYear;

    let filterInt = function(value) {
      if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return Number(value);
      return NaN;
    }
  
    if (filterInt(startYear)) {
      queryURL += "&begin_date=" + startYear + "0101";
    };
  
    // if the user provides an endYear, include it in the queryURL
    let endYear = searchInput.endYear;
  
    if (filterInt(endYear)) {
      queryURL += "&end_date=" + endYear + "0101";
    }
  
    // Logging the URL so we have access to it for troubleshooting
    //console.log("---------------\nURL: " + queryURL + "\n---------------");
  
    axios.get(queryURL).then(function (response) {

        
        let results = [];
        for(let i=0; i<response.data.response.docs.length; i++){

            let article = {};

            article.title = response.data.response.docs[i].headline.main;
            article.date = response.data.response.docs[i].pub_date;
            if(response.data.response.docs[i].byline !==null && response.data.response.docs[i].byline !==undefined) {
              article.author = response.data.response.docs[i].byline.original;
            } else { article.author = "New York Times"}
            article.url = response.data.response.docs[i].web_url;
            if(response.data.response.docs[i].multimedia[0] !== null && response.data.response.docs[i].multimedia[0] !== undefined) {
            article.pic="https://www.nytimes.com/"+response.data.response.docs[i].multimedia[0].url;
            } else {article.pic = "https://www.abortionno.org/wp-content/uploads/2016/02/no-image-found.jpg" }

            results.push(article);
            

        };
       
        callback(results);
        
       
      })
      .catch(function (error) {
        callback(error);
      });
  }

  export default buildQueryURL;

 