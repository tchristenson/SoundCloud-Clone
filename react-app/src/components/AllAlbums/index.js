import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllAlbumsThunk } from "../../store/albums"
import { NavLink } from "react-router-dom"
import './AllAlbums.css';
import { getAllUsersThunk } from "../../store/users";

function AllAlbums() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAlbumsThunk())
    dispatch(getAllUsersThunk())
  }, [dispatch])

  const albums = useSelector(state => state.albums)
  const users = useSelector(state => state.users)
  console.log("thjsesaldajsd", users)
  if (!albums) return null

  const albumsArr = Object.values(albums)

  const albumList = albumsArr.map(album => (
    <div to={`/albums/${album.id}`}>
      <div className="album-div">
        <div className="album-pic-div">
          <img className="album-pic" src={album.coverImage} />
        </div>
        <div>
          <div> <a href={`/albums/${album.id}`}>{album.name}</a></div>
           <div> <a href={`/users/${[album.ownerId]}`}>{users[album.ownerId]?.alias}</a>
      </div>
          </div>
      </div>



    </div>
  ))

  return (
    <div>
      {albumList}

    </div>
  )
}

export default AllAlbums
