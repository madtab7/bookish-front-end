

export default class InternalAdapter {

  static signUpUser(userData){
    fetch('http://localhost:3001/api/v1/users', {
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

}
