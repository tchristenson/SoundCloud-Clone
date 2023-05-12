import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/albums"
import DragDropFiles from "../DragDropFiles";


function AlbumFormPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [styleId, setStyleId] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true)
    if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('cover_image', coverImage)
    formData.append('style_id', styleId)

    for (let key of formData.entries()) {
      console.log(key[0] + '----->' + key[1]);
    }

    const newAlbum = await dispatch(createAlbumThunk(formData))

    setName('')
    setCoverImage('')
    setStyleId('')
    setValidationErrors([])
    setHasSubmitted(false)

    history.push(`/albums/${newAlbum.id}`)
  }

  useEffect(() => {
    const errors = [];
    // Only adding to the validation errors for fields that are nullable=False in the Song model
    if (!name) errors.push('Please enter a name!')
    setValidationErrors(errors)
  }, [name])

  return (
    <div>
        <h1>Create a New Album</h1>
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

            <div className="form-input-box">
                <label>Cover Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    >
                </input>
            </div>

            <div className="form-input-box">
                <DragDropFiles />
            </div>

            <div className="form-input-box">
                <label>Album Style:</label>
                <select onChange={(e) => setStyleId(e.target.value)}>
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

            <button type="submit">Create Album</button>
        </form>
    </div>
)
}

export default AlbumFormPage
