import InternalAdapter from '../apis/InternalAdapter'

export const loginUser = (username, password) => {
  return (dispatch => {
    dispatch(authenticatingUser())
    InternalAdapter.loginUser(username, password)
    .then(response => {
      if (response.ok){
        return response.json()
      } else {
        throw response
      }
    })
    .then(JSONResponse => {
      localStorage.setItem('jwt', JSONResponse.jwt)
      dispatch(setCurrentUser(JSONResponse.user))
    })
    .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  })
}

export const signUpUser = (username, password, full_name, avatarURL) => {
  return (dispatch => {
    dispatch(authenticatingUser())
    InternalAdapter.signUpUser(username, password, full_name, avatarURL)
    .then(response => {
      if (response.ok){
        return response.json()
      } else {
        throw response
      }
    })
    .then(JSONResponse => {
      localStorage.setItem('jwt', JSONResponse.jwt)
      dispatch(setCurrentUser(JSONResponse.user))
    })
    .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  })
}

export const fetchCurrentUser = () => {
  //matches jwt to user
  return(dispatch) => {
    dispatch(authenticatingUser())
    InternalAdapter.getUser()
    .then(response => response.json())
    .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

// export const logoutUser = () => {
//   return (dispatch) => {
//     localStorage.removeItem('jwt')
//     dispatch({type: 'LOGOUT_USER'})
//   }
// }

// handle userdata
export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

// handle errors
export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

// handle action of fetching
export const authenticatingUser = () =>({ type: 'AUTHENTICATING_USER' })
