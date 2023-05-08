import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getOneAlbumThunk } from "../../store/albums";

// '/users/albums/:albumId'
function AlbumPage() {
  console.log('Album Page')
  const dispatch = useDispatch();
  const { albumId } = useParams();
  console.log('id ', albumId);


  useEffect(() => {
    dispatch(getOneAlbumThunk(albumId))
  }, [albumId, dispatch])

  const album = useSelector(state => state.albums[albumId]);
  if (!album) return null;

  return (
    <div>
      <h1>This is the AlbumPage Component</h1>
      <div>{album.name}</div>
    </div>
  )
}

export default AlbumPage;
