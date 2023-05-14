const GET_USER_PLAYLISTS = '/playlists/GET_USER_PLAYLISTS'

const getUserplaylistsAction = (playlists) => {
    return {
      type: GET_USER_PLAYLISTS,
      playlists
    }
  }

export const getCurrentUsersPlaylistsThunk = () => async (dispatch) => {
  console.log('getCurrentUsersPlaylistsThunk running')
  const response = await fetch('/api/playlists/current');
  if (response.ok) {
    const userPlaylists = await response.json();
    console.log('userplaylists inside of getCurrentUsersplaylistsThunk ======>', userPlaylists)
    dispatch(getUserplaylistsAction(userPlaylists));
    return userPlaylists
  } else {
    return console.log("Get current user's playlists: bad response")
  }
}

const playlistReducer = (state = {}, action) => {
    let newState
    switch (action.type) {
      case GET_USER_PLAYLISTS:
        newState = {...state}
        console.log('playlist reducer action ==> :', action)
        action.playlists.playlists.forEach(playlist => newState[playlist.id] = playlist)
        return newState
      default:
        return state
    }
  }

  export default playlistReducer;
