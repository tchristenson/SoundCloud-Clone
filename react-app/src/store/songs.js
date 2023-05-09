const GET_ALL_SONGS = "/GET_SONGS";
const GET_USERS_SONGS = "/GET_USERS_SONGS";
const GET_SONG = "/GET_SONG";
const CREATE_SONG = "/CREATE_SONG";
const DELETE_SONG = "/DELETE_SONG";

const getAllSongsAction = (songs) => {
  return {
    type: GET_ALL_SONGS,
    songs,
  };
};
const getAllSongsAction2 = (songs) => {
  return {
    type: GET_USERS_SONGS,
    songs,
  };
};

const getOneSongAction = (song) => {
  return {
    type: GET_SONG,
    song,
  };
};

const deleteOneSongAction = (songId) => {
  return {
    type: DELETE_SONG,
    songId,
  };
};

const createSongAction = (song) => {
  return {
    type: CREATE_SONG,
    song
  }
}

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs");
  console.log("response", response);
  if (response.ok) {
    const { songs } = await response.json();
    console.log("songsTHUNK", songs);
    dispatch(getAllSongsAction(songs));
  } else {
    console.log("Response not ok");
  }
};

export const getOneSongThunk = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`);
  console.log("getOneSongThunk Hit ##"); // We are hitting this thunk instead of createSongThunk

  if (response.ok) {
    const song = await response.json();
    dispatch(getOneSongAction(song));
    return song;
  }
};

export const getCurrentUsersSongsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/songs/current`)

  if(response.ok) {
    const {songs} = await response.json()
    dispatch(getAllSongsAction2(songs))
  } else {
    return console.log("get current user songs: response not ok")
  }
}

export const createSongThunk = (song) => async (dispatch) => {
  console.log('song inside of createSongThunk', song)
  const response = await fetch('/api/songs/new', {
    method: "POST",
    body: song
  });
  console.log('response inside of createSongThunk', response)
  if (response.ok) {
    const song = await response.json();
    console.log('newSong inside of createSongThunk',song)
    dispatch(createSongAction(song));
    return song;
  } else {
    return console.log("create songs: response not ok");
  }
};

export const deleteOneSongThunk = (songId) => async (dispatch) => {
  console.log("deleting a song by id THUNK")
  const res = await fetch(`/api/songs/delete/${songId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteOneSongAction(songId));

  } else {
    console.log("Song couldnt be deleted")
  }
};

const initState = {};
function songReducer(state = initState, action) {
  let newState;
  switch (action.type) {
    case GET_SONG:
      newState = { ...state };
      newState[action.song.id] = action.song;
      return newState;
    case GET_USERS_SONGS:
      newState = { ...state };
      console.log("action, action", action.songs);
      action.songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    case GET_ALL_SONGS:
      newState = { ...state };
      console.log("action, action", action.songs);
      action.songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    case DELETE_SONG:
      newState = {...state}
      delete newState.song[action.songId]
      return newState
    case CREATE_SONG:
      newState = {...state}
      console.log('action.song inside CREATE_SONG Reducer', action.song)
      newState[action.song.id] = action.song
      return newState;
    default:
      return state;
  }
}

export default songReducer;
