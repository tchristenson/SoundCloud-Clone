import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneAlbumThunk } from "../../store/albums";

const EditAlbumFormPage = () => {
  const {albumId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const album = useSelector(state => state.albums[albumId])

  const [name, setName] = useState("");
  const [styleId, setStyleId] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getOneAlbumThunk(albumId))
  }, [dispatch])

  useEffect(() => {
    if (album) {
      setName(album.name)
      setStyleId(album.styleId)
    }
  }, [album])

}

export default EditAlbumFormPage
