const GET_ALL_SONGS = "/GET_SONGS";
const GET_SONG = "/GET_SONG";

const getAllSongsAction = (songs) => {
  return {
    type: GET_ALL_SONGS,
    songs,
  };
};

const getOneSongAction = (song) => {
  return {
    type: GET_SONG,
    song
  }
}

export const getAllSongsThunk = () => async (dispatch) => {
    const response = await fetch("/api/songs");
    console.log('response', response)
  if (response.ok) {
    const{songs} = await response.json();
    console.log('songsTHUNK', songs)
    dispatch(getAllSongsAction(songs));

  } else {
    console.log('Response not ok')
  }
};

export const getOneSongThunk = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`);
  console.log("getOneSongThunk Hit ##")

  if (response.ok) {
    const song = await response.json();
    dispatch(getOneSongAction(song))
    return song
  }
}

export const getCurrentUsersSongsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/songs/current`)

  if(res.ok) {
    const userSongs = await res.json()
    dispatch(getAllSongsAction(userSongs))
  } else {
    return console.log("get current user songs: res not ok")
  }
}

const initState = {};
function songReducer(state = initState, action){
    let newState;
    switch(action.type){
        case GET_SONG:
          newState = {...state}
          newState[action.song.id] = action.song
          return newState
        case GET_ALL_SONGS:
            newState = {...state}
            console.log('action, action', action.songs)
            action.songs.forEach(song => {
                newState[song.id] = song
            });
            return newState
        default:
            return state
    }
}


export default songReducer
