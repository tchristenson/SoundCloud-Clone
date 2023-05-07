
const GET_ALL_SONGS = '/GET_USER'

const getAllSongsAction = songs => {
    return {
        type: GET_ALL_SONGS,
        songs
    }
}

export const getAllSongsThunk = () => async dispatch
