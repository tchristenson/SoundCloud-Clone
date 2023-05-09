import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useEffect } from "react"
import { getOneAlbumThunk, deleteAlbumThunk } from "../../store/albums";

// '/users/albums/:albumId'
function AlbumPage() {
  console.log('Album Page')
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  console.log('id ', albumId);


  useEffect(() => {
    dispatch(getOneAlbumThunk(albumId))
  }, [albumId, dispatch])

  const album = useSelector(state => state.albums[albumId]);

  const deleteAlbum = (e) => {
    e.preventDefault();
    dispatch(deleteAlbumThunk(album));
    history.push("/albums/current");
  }

  if (!album) return null;

  return (
    <div>
      <h1>This is the AlbumPage Component</h1>
      <div>{album.name}</div>

      <form onSubmit={deleteAlbum}>
        <button type="submit">
          <h1>Delete an album</h1>
        </button>
      </form>
    </div>
  )
}

export default AlbumPage;
