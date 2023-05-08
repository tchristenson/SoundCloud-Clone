// ACTIONS
const GET_ALL_ALBUMS = 'albums/GET_ALL_ALBUMS'
const GET_ONE_ALBUM = 'albums/GET_ONE_ALBUM'
const GET_USER_ALBUMS = 'albums/GET_USER_ALBUMS'

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

const getUserAlbumsAction = (albums) => {
  return {
    type: GET_USER_ALBUMS,
    albums
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
  console.log('checking inside of getOneAlbumThunk')

  if (response.ok) {
    const album = await response.json()
    dispatch(getOneAlbumAction(album))
    return album
  }
}

export const getCurrentUsersAlbumsThunk = () => async (dispatch) => {
  const response = await fetch('/api/albums/current');

  if (response.ok) {
    const userAlbums = await response.json();
    console.log('userAlbums inside of getCurrentUsersAlbumsThunk ---->', userAlbums)
    dispatch(getUserAlbumsAction(userAlbums));
  } else {
    return console.log("Get current user's albums: bad response")
  }
}


// REDUCER
const albumReducer = (state = {}, action) => {
  let newState
  switch (action.type) {
    case GET_ALL_ALBUMS:
      newState = {...state}
      action.albums.Albums.forEach(album => newState[album.id] = album)
      return newState
    case GET_ONE_ALBUM:
      newState = {...state}
      newState[action.album.id] = action.album
      return newState
    case GET_USER_ALBUMS:
      newState = {...state}
      action.albums.Albums.forEach(album => newState[album.id] = album)
      return newState
    default:
      return state
  }
}

export default albumReducer;
