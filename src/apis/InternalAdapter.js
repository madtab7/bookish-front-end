

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

  static createUserBook(userId, bookData){
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
    .then(data => {
      fetch('http://localhost:3001/api/v1/shelved_books',{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          book: {
            book_id: data.id,
            user_id: userId,
            read: true,
            want_to_read: false
          }
        })
      })
    })
  }
}
