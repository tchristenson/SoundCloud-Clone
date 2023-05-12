import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneAlbumThunk } from "../../store/albums";
import { editAlbumThunk } from "../../store/albums";

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

  useEffect(() => {
    const errors = [];
    // Only adding to the validation errors for fields that are nullable=False in the Song model
    if (!name) errors.push('Please enter a name!')
    if (!styleId) errors.push('Please enter a style!')
    setValidationErrors(errors)
  }, [name, styleId])

  if (!album) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    setHasSubmitted(true)
    if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('style_id', styleId)
    formData.append('id', album.id)

    const editedAlbum = await dispatch(editAlbumThunk(formData)) // Need to actually make this

    setName('')
    setStyleId('')
    setValidationErrors([])
    setHasSubmitted(false)

    history.push(`/albums/${editedAlbum.id}`) // Comment this back in when complete

  }

  return (
    <div>
        <h1>Update your Album</h1>
        {hasSubmitted && validationErrors.length > 0 && (
            <div>
                <h2>The following errors were found:</h2>
                <ul>
                    {validationErrors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
        <form
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
        >
            <div className="form-input-box">
                <label>Album Name:</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required={true}
                    >
                </input>
            </div>

            {/* <div className="form-input-box">
                <label>Cover Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    >
                </input>
            </div> */}

            <div className="form-input-box">
                <label>Album Style:</label>
                <select required={true} onChange={(e) => setStyleId(e.target.value)}>
                    <option value="">{'(select one)'}</option>
                    <option value={1}>Reggae</option>
                    <option value={2}>Rock</option>
                    <option value={3}>Punk</option>
                    <option value={4}>Pop</option>
                    <option value={5}>Electronic</option>
                    <option value={6}>Jazz</option>
                    <option value={7}>Blues</option>
                    <option value={8}>Country</option>
                    <option value={9}>Metal</option>
                    <option value={10}>Folk</option>
                    <option value={11}>Funk</option>
                    <option value={12}>Soul</option>
                    <option value={13}>Classical</option>
                </select>
            </div>

            <button type="submit">Update Album</button>
        </form>
    </div>
)

}

export default EditAlbumFormPage
