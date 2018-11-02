

export default class InternalAdapter {

  static signUpUser(userData){
    return fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: userData.username,
          password: userData.password,
          full_name: userData.full_name,
          avatarURL: userData.avatarURL
        }
      })
    })

  }

  static loginUser(userData){
    return fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: userData.username,
          password: userData.password
        }
      })
    })
  }

  static createUserBookRead(userId, bookData){
    return fetch('http://localhost:3001/api/v1/books', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        book: {
          title: bookData.title,
          author: bookData.authors[0],
          description: bookData.description,
          imgURL: bookData.imageLinks.thumbnail
        }
      })
    })
    .then(r=>r.json())
    .then(data => { console.log(data.id, userId)
      fetch('http://localhost:3001/api/v1/shelved_books',{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          shelved_book: {
            book_id: data.id,
            user_id: userId,
            read:true,
            want_to_read:false
          }
        })
      })
    })
  }

  static createUserBookWantToRead(userId, bookData){
    return fetch('http://localhost:3001/api/v1/books', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        book: {
          title: bookData.title,
          author: bookData.authors[0],
          description: bookData.description,
          imgURL: bookData.imageLinks.thumbnail
        }
      })
    })
    .then(r=>r.json())
    .then(data => { console.log(data.id, userId)
      fetch('http://localhost:3001/api/v1/shelved_books',{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          shelved_book: {
            book_id: data.id,
            user_id: userId,
            read:false,
            want_to_read:true
          }
        })
      })
    })
  }



}
