// ACTIONS
const GET_ONE_ALBUM = 'albums/getOneAlbum'

const getOneAlbumAction = (album) => {
  return {
    type: GET_ONE_ALBUM,
    album
  }
}


// THUNKS
export const getOneAlbumThunk = (albumId) = async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`)
  if (response.ok) {
    const album = await response.json()
    dispatch(getOneAlbumAction(album))
    return album
  }
}


// REDUCER
const albumReducer = (state = {}, action) => {
  let newState
  switch (action.type) {
    case GET_ONE_ALBUM:
      newState = {...state}
      newState[action.album.id] = action.album
      return newState
    default:
      return state
  }
}
