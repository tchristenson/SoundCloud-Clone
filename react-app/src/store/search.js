
// ----------------------------------------  ACTIONS  ----------------------------------------

const SEARCH_SONGS_ALBUMS_USERS = 'search/searchSongsAlbums'
const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults'

const searchSongsAlbumsUsersAction = (payload) => {
    return {
        type: SEARCH_SONGS_ALBUMS_USERS,
        payload
    }
}

const clearSearchResultsAction = (payload) => {
    return {
        type: CLEAR_SEARCH_RESULTS,
        payload
    }
}


// ----------------------------------------  THUNKS  ----------------------------------------

export const searchSongsAlbumsUsersThunk = (query) => async (dispatch) => {
    console.log('query inside thunk ------->', query)
    const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            query: query
          })
    })
    if (response.ok) {
        const searchResults = await response.json()
        console.log('searchResults from backend after response.json ------->', searchResults)
        dispatch(searchSongsAlbumsUsersAction(searchResults))
        return searchResults
    }
}

export const clearSearchResultsThunk = () => async (dispatch) => {
    dispatch(clearSearchResultsAction({}))
}


// ----------------------------------------  REDUCER  ----------------------------------------

const searchReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SEARCH_SONGS_ALBUMS_USERS:
            newState = {...state}
            let id = 1;
            action.payload.searchResults.forEach(item => {
              newState[id] = item;
              id += 1;
            });
            return newState
        case CLEAR_SEARCH_RESULTS:
            newState = {...state}
            newState = action.payload
            return newState
        default:
            return state
    }
}

export default searchReducer
