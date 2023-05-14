import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getOneAlbumThunk } from "../../store/albums";
import { getAllSongsThunk } from "../../store/songs";
import AlbumDeleteModal from "../AlbumDeleteModal";
import OpenModalButton from "../OpenModalButton";
import './AlbumPage.css';

function AlbumPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { albumId } = useParams();

  const songs = useSelector(state => Object.values(state.songs));
  const songsArr = Object.values(songs);
  const albumSongs = [];

  useEffect(() => {
    dispatch(getOneAlbumThunk(albumId))
    dispatch(getAllSongsThunk());
  }, [albumId, dispatch])

  const album = useSelector(state => state.albums[albumId]);

  for (let i = 0; i < songsArr.length; i++) {
    if (songsArr[i].albumId === parseInt(albumId)) {
      albumSongs.push(songsArr[i]);
    }
  }

  if (!album) return null;

  return (
    <div className="album-page-div">
      <h1 className="album-name-header">{album.name}</h1>

      <div className="album-details-1">
        <div className="album-page-pic-div">
          <img className="album-page-pic" src={album.coverImage} />
        </div>

        <div>
          <div>By {album.ownerId}</div>
          <div>Songs: {albumSongs.length}</div>
          <div>Style: {album.styleId}</div>
        </div>
      </div>

      <div>
        <h2 className="album-song-header">Songs in {album.name}</h2>
        <div className="album-songs-div">
          {albumSongs?.map(({name, albumId, styleId, ownerId, coverImage, id}) => (
            <NavLink to={`/songs/${id}`} key={id}>
              <div className="album-song-div" key={id}>
                <div className="album-song-pic-div">
                  <img className="album-song-pic" src={coverImage} />
                </div>
                <div className="album-song-name">{name}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {sessionUser && sessionUser.id === album.ownerId && (
        <div className="album-user-settings">
          <h2 className="album-user-settings-header">Album Settings</h2>
          <div className="album-user-settings-ui">
            <OpenModalButton buttonClass="album-user-settings-del" buttonText="Delete Album" modalComponent={<AlbumDeleteModal albumId = {albumId}/>} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AlbumPage;
