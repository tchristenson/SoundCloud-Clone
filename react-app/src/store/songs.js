
// ----------------------------------------  ACTIONS  ----------------------------------------

const GET_ALL_SONGS = "/GET_SONGS";
const GET_USERS_SONGS = "/GET_USERS_SONGS";
const GET_SONG = "/GET_SONG";
const CREATE_SONG = "/CREATE_SONG";
const DELETE_SONG = "/DELETE_SONG";
const EDIT_SONG = "/EDIT_SONG"
const BULK_CREATE_SONGS = '/BULK_CREATE_SONGS'
const LIKE_OR_UNLIKE_SONG = '/LIKE_OR_UNLIKE_SONG'


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

const editSongAction = (song) => {
  return {
    type: EDIT_SONG,
    song
  }
}

const bulkCreateSongAction = (song) => {
  return {
    type: BULK_CREATE_SONGS,
    song
  }
}

const likeOrUnlikeSongAction = song => {
    return {
        type: LIKE_OR_UNLIKE_SONG,
        song
    }
}

// ----------------------------------------  THUNKS  ----------------------------------------

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs");
  // console.log("response", response);
  if (response.ok) {
    const { songs } = await response.json();
    // console.log("songsTHUNK", songs);
    dispatch(getAllSongsAction(songs));
  } else {
    return ("getAllSongs Response not ok");
  }
};

export const getOneSongThunk = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`);
  // console.log("getOneSongThunk Hit ##"); // We are hitting this thunk instead of createSongThunk

  if (response.ok) {
    const song = await response.json();
    dispatch(getOneSongAction(song));
    return song;
  } else {
    return ("getOneSong Response not ok");
  }
};

export const getCurrentUsersSongsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/songs/current`)

  if (response.ok) {
    const { songs } = await response.json()
    dispatch(getAllSongsAction2(songs))
  } else {
    return ("get current user songs: response not ok")
  }
}

export const createSongThunk = (song) => async (dispatch) => {
  for (let key of song.entries()) {
    // console.log(key[0] + '----->' + key[1]);
  }
  const response = await fetch('/api/songs/new', {
    method: "POST",
    body: song
  });
  // console.log('response inside of createSongThunk', response)
  if (response.ok) {
    const song = await response.json();
    // console.log('newSong inside of createSongThunk', song)
    dispatch(createSongAction(song));
    return song;
  } else {
    return ("create songs: response not ok");
  }
};

export const deleteOneSongThunk = (songId) => async (dispatch) => {
  // console.log("deleting a song by id THUNK")
  const res = await fetch(`/api/songs/delete/${songId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteOneSongAction(songId));
    return { 'message': 'delete successful' };
  } else {
    return ("Song couldnt be deleted")
  }
};

export const editSongThunk = (song) => async (dispatch) => {
  // console.log('inside editSongThunk')
  // console.log('song inside editSongThunk', song)
  for (let key of song.entries()) {
    // console.log('formData inside Thunk', '---', key[0] + '---' + key[1]);
  }
  const songId = parseInt(song.get('id'))
  // console.log('songId inside editSongThunk', songId)
  const response = await fetch(`/api/songs/edit/${songId}`, {
    method: 'PUT',
    body: song
  })
  // console.log('response inside editSongThunk', response)
  if (response.ok) {
    const song = await response.json()
    // console.log('song after response inside editSongThunk', song)
    dispatch(editSongAction(song))
    return song
  } else {
    return ('edit songs: response not ok')
  }
}

export const bulkCreateSongThunk = (song) => async (dispatch) => {
  // for (let key of song.entries()) {
  //   console.log('Inside Thunk: ', key[0] + '----->' + key[1]);
  // }
  const response = await fetch('/api/songs/bulk', {
    method: "POST",
    body: song
  });
  // console.log('response inside of bulkCreateSongThunk', response)
  if (response.ok) {
    const song = await response.json();
    // console.log('response.json() from backend', song)
    dispatch(bulkCreateSongAction(song));
    return song;
  } else {
    return ("bulk create songs: response not ok");
  }
};

export const likeOrUnlikeSongThunk = (songId, userId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}/likes/${userId}`, {
        method: 'POST',
        body: songId, userId
    });
    if (response.ok) {
        const song = await response.json()
        dispatch(likeOrUnlikeSongAction(song))
        return song
    }
}

// ----------------------------------------  REDUCER  ----------------------------------------

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
      // console.log("action, action", action.songs);
      action.songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    case GET_ALL_SONGS:
      newState = { ...state };
      // console.log("action, action", action.songs);
      action.songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    case DELETE_SONG:
      newState = { ...state }
      delete newState[action.songId]
      return newState
    case CREATE_SONG:
      newState = { ...state }
      // console.log('action.song inside CREATE_SONG Reducer', action.song)
      newState[action.song.id] = action.song
      return newState;
    case EDIT_SONG:
      newState = { ...state };
      // console.log('action.song inside EDIT_SONG Reducer', action.song)
      newState[action.song.id] = action.song
      return newState;
    case BULK_CREATE_SONGS:
      newState = { ...state }
      // console.log('action.song inside BULK_CREATE_SONG Reducer', action.song)
      newState[action.song.id] = action.song
      return newState;
    case LIKE_OR_UNLIKE_SONG:
        newState = { ...state }
        newState[action.song.id] = action.song
        return newState;
    default:
      return state;
  }
}

export default songReducer;
