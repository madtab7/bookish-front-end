export default class InternalAdapter {

  static signUpUser(username, password, full_name, avatarURL){
    return fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          full_name: full_name,
          avatarURL: avatarURL
        }
      })
    })

  }

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

  //match jwt with user
  static getUser(){
    return fetch('http://localhost:3001/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
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

  //create book review

  static createBookReview(userId, bookData, reviewObj){
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
      fetch('http://localhost:3001/api/v1/reviews', {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          review: {
            book_id: data.id,
            user_id: userId,
            title: reviewObj.title,
            content: reviewObj.review,
            rating: reviewObj.rating
          }
        })
      })
    })
  }

  // get user's reviews
  static getUserReviews(userId){
    return fetch(`http://localhost:3001/api/v1/reviews?user_id=${userId}`)
    .then(r=>r.json())
  }

  //delete user review
  static deleteUserReview(reviewId){
    return fetch(`http://localhost:3001/api/v1/reviews/${reviewId}`, {
      method: 'DELETE'
    })
  }

  static updateUserReview(reviewObj, reviewId){
    return fetch(`http://localhost:3001/api/v1/reviews/${reviewId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: reviewId,
        rating: reviewObj.rating,
        title: reviewObj.title,
        content: reviewObj.review
      })
    })
  }

}
