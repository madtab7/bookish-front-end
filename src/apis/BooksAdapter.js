const google_api_key = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY
// const nyt_api_key = process.env.REACT_APP_NYT_BOOKS_API_KEY
const nyt_api_key = "zqJGLbF1G35GWzGXmsuAoOwRYGgpjkGa"

const GOOGLE_Q_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes?q='
const NYT_LIST_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists/'

export default class BooksAdapter {

  //handle google books api query
  static getBooksFromQuery(stateObj){
    let userString = stateObj.userInput.split(" ").join("-")
    const queryInfo = `${userString}`
    return fetch(`${GOOGLE_Q_ENDPOINT}`+`${queryInfo}`+`&maxResults=40`+`&key=${google_api_key}`)
  }

  static getPaginatedBooksFromQuery(stateObj){
    let userString = stateObj.userInput.split(" ").join("-")
    let startIndex = stateObj.searchIndex
    const queryInfo = `${userString}`
    console.log(`${GOOGLE_Q_ENDPOINT}`+`${queryInfo}`+`&startIndex=${startIndex}`+`&maxResults=40`+`&key=${google_api_key}`)
    return fetch(`${GOOGLE_Q_ENDPOINT}`+`${queryInfo}`+`&startIndex=${startIndex}`+`&maxResults=40`+`&key=${google_api_key}`)
    .then(response => response.json())
  }

  //handle nyt best sellers api query
  static getBooksFromNYTList(stateObj){
    let listEndpoint = stateObj.listSelect
    console.log(process.env.REACT_APP_NYT_BOOKS_API_KEY)
    return fetch(`${NYT_LIST_ENDPOINT}`+`${listEndpoint}`+`?api-key=${nyt_api_key}`)
  }

  //handle google api call from NYT isbn
  static getGoogleData(isbn){
    return fetch(`${GOOGLE_Q_ENDPOINT}`+'isbn:'+`${isbn}`+`&printType=books`+`&key=${google_api_key}`)
  }

  //handle amazon link for purchase
  static getAmazonLink(isbn){
    // return (`https://www.amazon.com/gp/search/ref=sr_adv_b/?search-alias=stripbooks&unfiltered=1&field-keywords=&field-author=&field-title=&field-isbn=${isbn}&field-publisher=&node=&field-p_n_condition-type=&p_n_feature_browse-bin=&field-age_range=&field-language=&field-dateop=During&field-datemod=&field-dateyear=&sort=relevanceexprank&Adv-Srch-Books-Submit.x=31&Adv-Srch-Books-Submit.y=10`);
    return(`https://www.amazon.com/s?k=${isbn}&i=stripbooks&ref=nb_sb_noss`)

  }

}
