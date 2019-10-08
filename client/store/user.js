import axios from 'axios'
import history from '../history'
import {FirebaseWrapper} from '../../server/firebase/firebase'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => {
  return async dispatch => {
    try {
      const result = await FirebaseWrapper.GetInstance().userAuth(
        email,
        password,
        method
      )
      dispatch(getUser(result))
    } catch (err) {
      console.err(err)
    }
  }
}

export const logout = () => {
  return dispatch => {
    try {
      FirebaseWrapper.GetInstance().signOut()
      dispatch(removeUser())
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
