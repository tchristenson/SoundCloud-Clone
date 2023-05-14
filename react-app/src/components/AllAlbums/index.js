import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllAlbumsThunk } from "../../store/albums"
import { NavLink } from "react-router-dom"
import './AllAlbums.css';
import { getAllUsersThunk } from "../../store/users";
import { getAllStylesThunk } from "../../store/styles";
import { getAllSongsThunk } from "../../store/songs";
import OpenModalButton from "../OpenModalButton";
import AlbumFormPage from "../AlbumFormPage";

function AllAlbums() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAlbumsThunk())
    dispatch(getAllUsersThunk())
    dispatch(getAllStylesThunk())
    dispatch(getAllSongsThunk())
  }, [dispatch])

  const albums = useSelector(state => state.albums)
  const sessionUser = useSelector(state => state.session.user)
  const users = useSelector(state => state.users)
  const styles = useSelector(state => Object.values(state.styles))
  const songs = useSelector(state => Object.values(state.songs))

  const songAlbumIds = songs.map(song => song.name)
  console.log("albums idddddds", songAlbumIds)

  const styleIds = styles.map(style =>
    style.genre)
  console.log("thjsesaldajsd", albums)
  if (!albums) return null

  const albumsArr = Object.values(albums)

  const albumList = albumsArr.map(album => (
    <div to={`/albums/${album.id}`}>
      <div className="album-div">
        <div className="album-pic-div">
          <a href={`/albums/${album.id}`}><img alt="img" className="album-pic" src={album.coverImage} /></a>
        </div>
        <div>
          <div> <a href={`/albums/${album.id}`}>Album title: {album.name}</a></div>
          <div> <a href={`/users/${[album.ownerId]}`}>Artist: {users[album.ownerId]?.alias}</a> <div>Genre: {styleIds[album.styleId - 1]}</div>
          </div>
        </div>
      </div>


    </div>
  ))

  return (
    <div>
      {sessionUser && (<OpenModalButton buttonText="Create an album" onItemClick="" modalComponent={<AlbumFormPage />} />) }
      {albumList}

    </div>
  )
}

export default AllAlbums
