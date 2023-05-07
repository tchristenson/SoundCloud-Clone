// ACTIONS
const GET_ALL_ALBUMS = 'albums/GET_ALL_ALBUMS'
const GET_ONE_ALBUM = 'albums/GET_ONE_ALBUM'

const getAllAlbumsAction = (albums) => {
  return {
    type: GET_ALL_ALBUMS,
    albums
  }
}

const getOneAlbumAction = (album) => {
  return {
    type: GET_ONE_ALBUM,
    album
  }
}


// THUNKS
export const getAllAlbumsThunk = () => async (dispatch) => {
  const response = await fetch('/api/albums')
  if (response.ok) {
    const albums = await response.json()
    dispatch(getAllAlbumsAction(albums))
    return albums
  }
}

export const getOneAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`)
  console.log('response ', response)

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

export default albumReducer;
