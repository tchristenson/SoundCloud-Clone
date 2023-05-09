// ACTIONS
const GET_ALL_ALBUMS = 'albums/GET_ALL_ALBUMS'
const GET_ONE_ALBUM = 'albums/GET_ONE_ALBUM'
const GET_USER_ALBUMS = 'albums/GET_USER_ALBUMS'
const DELETE_ALBUM = 'albums/DELETE_ALBUM'

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

const deleteAlbumAction = (albumId) => {
  return {
    type: DELETE_ALBUM,
    albumId
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
    console.log('album inside of getOneAlbumThunk', album)
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
    return userAlbums
  } else {
    return console.log("Get current user's albums: bad response")
  }
}

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
  console.log('albumId inside deleteAlbumThunk', albumId)
  const response = await fetch(`/api/albums/delete/${albumId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    console.log('response inside of deleteAlbumThunk', response)
    // const delAlbum = response.json();
    dispatch(deleteAlbumAction(albumId));
    return {'message': 'delete successful'}
  } else {
    return console.log("Delete current user's album: bad response");
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
    case DELETE_ALBUM:
      newState = {...state};
      console.log('newState inside Reducer', newState)
      console.log('newState.album inside Reducer', newState.album)
      console.log('action inside Reducer', action)
      delete newState[action.albumId];
      return newState;
    default:
      return state
  }
}

export default albumReducer;
