const GET_ALL_SONGS = "/GET_SONGS";

const getAllSongsAction = (songs) => {
  return {
    type: GET_ALL_SONGS,
    songs,
  };
};

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


const initState = {};
function songReducer(state = initState, action){
    let newState;
    switch(action.type){
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
