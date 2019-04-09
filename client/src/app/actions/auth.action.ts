


export enum ActionTypes {
  SetToken = 'SET_AUTH_TOKEN',
  SetUser = 'SET_USER',
  ClearAuth = 'CLEAR_AUTH'
}
export const setToken = (payload) => ({
  type: ActionTypes.SetToken,
  payload
})
export const setUser = (payload) => ({
  type: ActionTypes.SetUser,
  payload
})
export const clearAuth = () => ({
  type: ActionTypes.ClearAuth,
})



