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
      <div>{album.name}</div>
      {sessionUser && sessionUser.id === album.ownerId && (
        <OpenModalButton buttonText="Delete Album" modalComponent={<AlbumDeleteModal albumId = {albumId}/>} />
      )}
    </div>
  )
}

export default AlbumPage;
