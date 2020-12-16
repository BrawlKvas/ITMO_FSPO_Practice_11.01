const SET_AUTH_DATA = 'auth/SET_AUTH_DATA'
const REMOVE_AUTH_DATA = 'auth/REMOVE_AUTH_DATA'

const STORAGENAME = 'auth/STORAGENAME'

const storageData = JSON.parse(localStorage.getItem(STORAGENAME))

const initState = {
  userId: storageData ? storageData.userId : null,
  id: storageData ? storageData.id : null,
  role: storageData ? storageData.role : null,
  isAuth: !!storageData
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      }

    case REMOVE_AUTH_DATA:
      return {
        ...state,
        userId: null,
        id: null,
        role: null,
        isAuth: false
      }

    default: return state
  }
}

export default authReducer


//AC
const setAuthData = (data) => ({ type: SET_AUTH_DATA, data })
const removeAuthData = () => ({ type: REMOVE_AUTH_DATA })


//THUNK
export const signIn = (login, password, remember) => async (dispatch) => {
  try {
    const res = await window.ipcRenderer.invoke('signIn', { login, password })

    if (remember)
      localStorage.setItem(STORAGENAME, JSON.stringify(res))

    dispatch(setAuthData(res))

  } catch (e) {
    throw e
  }
}

export const signOut = () => (dispatch) => {
  localStorage.removeItem(STORAGENAME)
  dispatch(removeAuthData())
}