import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getOneAlbumThunk } from "../../store/albums";
import AlbumDeleteModal from "../AlbumDeleteModal";
import OpenModalButton from "../OpenModalButton";

function AlbumPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { albumId } = useParams();


  useEffect(() => {
    dispatch(getOneAlbumThunk(albumId))
  }, [albumId, dispatch])

  const album = useSelector(state => state.albums[albumId]);

  if (!album) return null;

  return (
    <div>
      <h1>This is the AlbumPage Component</h1>
      <p>Note: The drag and drop feature is in process, so to create an album with
        songs on it you must select multiple song files at once and drag them onto the
         div tag that says "Drag and Drop Songs to Upload". You cannot drag and drop songs one by one
         and the songs cannot be inside of a folder. But as long as you  drop multiple files all together, the songs
         should simultaneously be created when creating the album  </p>
      <div>{album.name}</div>
      {sessionUser && sessionUser.id === album.ownerId && (
        <OpenModalButton buttonText="Delete Album" modalComponent={<AlbumDeleteModal albumId = {albumId}/>} />
      )}
    </div>
  )
}

export default AlbumPage;
