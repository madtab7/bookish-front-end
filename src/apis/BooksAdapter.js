const google_api_key = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
const nyt_api_key = process.env.REACT_APP_NYT_BOOKS_API_KEY

const GOOGLE_Q_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes?q='
const NYT_LIST_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists/'

export default class BooksAdapter {

  //handle google books api query
  static getBooksFromQuery(stateObj){
    let userString = stateObj.userInput.split(" ").join("-")
    // let query;
    // switch(stateObj.radioSelect){
    //   case "title":
    //     query = "intitle:"
    //     break
    //   case "author":
    //     query = "inauthor:"
    //     break
    //   default:
    //     query = "";
    //     break
    // }
    // const queryInfo = `${query}`+`${userString}`
    const queryInfo = `${userString}`
    return fetch(`${GOOGLE_Q_ENDPOINT}`+`${queryInfo}`+`&maxResults=40`+`&key=${google_api_key}`)
  }

  //handle nyt best sellers api query
  static getBooksFromNYTList(stateObj){
    let listEndpoint = stateObj.listSelect
    return fetch(`${NYT_LIST_ENDPOINT}`+`${listEndpoint}`+`?api-key=${nyt_api_key}`)
  }

  //handle google api call from NYT isbn
  static getGoogleData(isbn){
    return fetch(`${GOOGLE_Q_ENDPOINT}`+'isbn:'+`${isbn}`+`&printType=books`+`&key=${google_api_key}`)
  }

  //handle amazon link for purchase
  static getAmazonLink(isbn){
    return (`https://www.amazon.com/gp/search/ref=sr_adv_b/?search-alias=stripbooks&unfiltered=1&field-keywords=&field-author=&field-title=&field-isbn=${isbn}&field-publisher=&node=&field-p_n_condition-type=&p_n_feature_browse-bin=&field-age_range=&field-language=&field-dateop=During&field-datemod=&field-dateyear=&sort=relevanceexprank&Adv-Srch-Books-Submit.x=31&Adv-Srch-Books-Submit.y=10`);

  }

}
