import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllAlbumsThunk } from "../../store/albums"
import { NavLink } from "react-router-dom"
import './AllAlbums.css';

function AllAlbums() {

  const dispatch = useDispatch()
  const [query, setQuery] = useState("")

  useEffect(() => {
    dispatch(getAllAlbumsThunk())
  }, [dispatch])

  const albums = useSelector(state => state.albums)

  if (!albums) return null

  const albumsArr = Object.values(albums)

  // const albumList = albumsArr.map(album => (
  //   <NavLink to={`/albums/${album.id}`}>
  //     <div className="album-div">
  //       <div className="album-pic-div">
  //         <img className="album-pic" src={album.coverImage} />
  //       </div>
  //       <div>
  //         <div>{album.name}</div>
  //         <div></div>
  //       </div>
  //     </div>

  //   </NavLink>
  // ))

  return (
    <div>
      <input id="searchBar" placeholder="Enter Album Title" onChange={event => setQuery(event.target.value)}/>
      {albumsArr?.filter(album => {
        if (query === '') {
          return album;
      } else if (album.name.toLowerCase().includes(query.toLocaleLowerCase())) {
          return album
      }
      }).map(album => (
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
      ))}
    </div>
  )
}

export default AllAlbums
