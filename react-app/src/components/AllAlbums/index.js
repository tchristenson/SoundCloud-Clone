import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllAlbumsThunk } from "../../store/albums"
import { NavLink } from "react-router-dom"
import './AllAlbums.css';

function AllAlbums() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAlbumsThunk())
  }, [dispatch])

  const albums = useSelector(state => state.albums)

  if (!albums) return null

  const albumsArr = Object.values(albums)

  const albumList = albumsArr.map(album => (
    <NavLink to={`/albums/${album.id}`}>
      <div className="album-div">
        <div className="album-pic-div">
          <img className="album-pic" src={album.coverImage} />
        </div>
        <div>
          <div>{album.name}</div>
          <div></div>
        </div>
      </div>
      
    </NavLink>
  ))

  return (
    <div>
      {albumList}
    </div>
  )
}

export default AllAlbums
