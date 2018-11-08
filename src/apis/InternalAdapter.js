

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

  // static loginUser(userData){
  //   return fetch('http://localhost:3001/api/v1/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         username: userData.username,
  //         password: userData.password
  //       }
  //     })
  //   })
  // }

//////////////// loginUser REDUX BELOW ////////////////

  static loginUser(username, password){
    return fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
  }

  //////////////// loginUser REDUX END ////////////////

  //match jwt with user
  static getUser(){
    return fetch('http://localhost:3001/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
  }

  //////////////// REDUX /////////////////////////

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
            read: false,
            want_to_read:true
          }
        })
      })
    })
  }

  // get users shelved books
  static getUserShevedBooks(userId){
    return fetch(`http://localhost:3001/api/v1/shelved_books?user_id=${userId}`)
    .then(r=>r.json())
  }

  static getAllShelvedBooks(userId){
    return fetch('http://localhost:3001/api/v1/shelved_books')
    .then(r=>r.json())
  }


  // update user bookshelf
  static updateUserBookshelfToRead(bookId){
    return fetch(`http://localhost:3001/api/v1/shelved_books/${bookId}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shelved_book:{
          read: true,
          want_to_read: false
        }
      })
    })
  }

//remove book from users shelf
  static updateUserBookshelfToRemove(bookId){
    return fetch(`http://localhost:3001/api/v1/shelved_books/${bookId}`, {
      method: "DELETE"
    })
  }

  static getAllUsers(){
    return fetch(`http://localhost:3001/api/v1/users`)
    .then(r=>r.json())
  }


  static createFriendship(userId, friendId){
    return fetch('http://localhost:3001/api/v1/friendships', {
      method: "POST",
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        friendship: {
          user_id: userId,
          friend_id: friendId
        }
      })
    })
  }

  static getUserFriends(userId){
    return fetch(`http://localhost:3001/api/v1/friendships?user_id=${userId}`)
    .then(r=>r.json())
  }

//create book user recommended
  static createBookUserRecommends(userId, friendId, bookData){
    console.log(userId, friendId)
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
          shelved_book: {
            book_id: data.id,
            user_id: userId,
            read:false,
            want_to_read:false,
            recommended: true,
            friend_id: friendId
          }
        })
      })
    })
  }


}
