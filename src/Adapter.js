const google_api_key = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY

const GOOGLE_Q_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes?q='

export default class Adapter {

  static getBooksFromQuery(stateObj){
    let userString = stateObj.userInput.split(" ").join("-")
    let query;
    switch(stateObj.radioSelect){
      case "title":
        query = "intitle:"
        break
      case "author":
        query = "inauthor:"
        break
      default:
        query = null;
        break
    }
    const queryInfo = `${query}`+`${userString}`
    return fetch(`${GOOGLE_Q_ENDPOINT}`+`${queryInfo}`+`&maxResults=40`+`&key=${google_api_key}`)
  }

}
