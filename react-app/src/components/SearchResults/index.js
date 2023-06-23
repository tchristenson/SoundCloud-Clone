import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
// import styles from './SearchResults.module.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { getAllSongsThunk } from "../../store/songs";
import { getAllUsersThunk } from "../../store/users";
import { getAllAlbumsThunk } from "../../store/albums";
import { getAllStylesThunk } from "../../store/styles";
import styles from './SearchResults.module.css'

function SearchResults() {
    const dispatch = useDispatch();

    const searchResults = useSelector(state => state.search)
    const searchResultsArr = Object.values(searchResults)
    console.log('searchResults', searchResults)
    console.log('searchResultsArr', searchResultsArr)

    useEffect(() => {
        dispatch(getAllSongsThunk());
        dispatch(getAllUsersThunk());
        dispatch(getAllAlbumsThunk());
        dispatch(getAllStylesThunk());
      }, [dispatch]);

      const songs = useSelector((state) => Object.values(state.songs));
      const users = useSelector((state) => (state.users));
      const albums = useSelector((state) => Object.values(state.albums))
      const styles = useSelector(state => Object.values(state.styles))

      const userIds = songs.map((song) => {
        return song.ownerId
      })
      const songUsers = userIds.map(id => {
        return users[id]?.alias
      })

      const albumIds = albums.map(album => {
        return album.name
      })

      const styleIds = styles.map(style =>
        style.genre)

    const songUsers2 = songs.map((val, index) => {
        const username = songUsers[index]
        // console.log("this is the styles========", styles)
        return (<>
            <a className='artistName' href={`/users/${val.ownerId}`}>{username}</a>
        </>)
        })

    const searchedSongs = searchResultsArr.filter(result => {
        return result.hasOwnProperty('content')
    })
    console.log('searchedSongs inside component ------>', searchedSongs)

    const searchedAlbums = searchResultsArr.filter(result => {
        return result.hasOwnProperty('coverImage') && !result.hasOwnProperty('albumId')
    })
    console.log('searchedAlbums inside component ------>', searchedAlbums)

    // const searchedUsers = searchResultsArr.filter(result => {
    //     return result.hasOwnProperty('username')
    // })
    // console.log('searchedUsers inside component ------>', searchedUsers)

    const songsList = searchedSongs.map(({ name, albumId, styleId, coverImage, id }) => (
        <NavLink to={`/songs/${id}`} key={id}>
          <div id="song-div-on-search-page" className="song-div">
            <div className="song-picture-div">
              <img alt='songImage' className="song-picture" src={coverImage} />
            </div>

            <div>
              <div className="playlogo"></div>
              <div className="song-name">Title: {name}</div>
              <div>Artist: {songUsers2[id - 1]}  </div>
              <div>Genre: {styleIds[styleId - 1]}</div>
              <div>Album name: {albumIds[albumId - 1]} </div>

            </div>
            {/* <AddToPlaylistButton /> */}
          </div>
        </NavLink>
      ))

    const albumsList = searchedAlbums.map(album => (
        <NavLink to={`/albums/${album.id}`}>
          <div id="album-div-on-search-page" className="album-div">
            <div className="album-pic-div">
              <img alt='' className="album-pic" src={album.coverImage} />
            </div>
            <div>
              <div>{album.name}</div>
              <div>alias: {users[album.ownerId]?.alias}</div> <div>Genre: {styleIds[album.styleId - 1]?.toUpperCase()}</div>
            </div>
          </div>

        </NavLink>
      ))

    // const usersList = searchedUsers.map(user => (
    //     <div key={user.id}>{user.alias}</div>
    // ))

    return (
        <div id="songPage">
        <div className="search-results-container">
            <h2>Your search results:</h2>
            <h3>Songs:</h3>
            <div>
                {songsList.length ? (
                songsList
                ) : (
                <h4>No songs match your search</h4>
                )}
            </div>
            <h3>Albums:</h3>
            <div>
                {albumsList.length ? (
                albumsList
                ) : (
                <h4>No albums match your search</h4>
                )}
            </div>
            {/* <h3>Users:</h3>
            <div>
                {usersList.length ? (
                usersList
                ) : (
                <h4>No users match your search</h4>
                )}
            </div> */}
        </div>
        </div>
    )
}

export default SearchResults
