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
  const [style, setStyle] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true)
    if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('cover_image', coverImage)
    formData.append('style', style)

    for (let key of formData.entries()) {
      console.log(key[0] + '----->' + key[1]);
    }

    const newAlbum = await dispatch(createAlbumThunk(formData))

    setName('')
    setCoverImage('')
    setStyle('')
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
                <select onChange={(e) => setStyle(e.target.value)}>
                    <option value="">{'(select one)'}</option>
                    <option value='reggae'>Reggae</option>
                    <option value='classic_rock'>Classic Rock</option>
                    <option value='punk'>Punk</option>
                    <option value='pop'>Pop</option>
                    <option value='hip_hop'>Hip Hop</option>
                    <option value='electronic'>Electronic</option>
                    <option value='jazz'>Jazz</option>
                    <option value='blues'>Blues</option>
                    <option value='country'>Country</option>
                    <option value='metal'>Metal</option>
                    <option value='folk'>Folk</option>
                    <option value='funk'>Funk</option>
                    <option value='soul'>Soul</option>
                    <option value='rnb'>R&B</option>
                    <option value='classical'>Classical</option>

                </select>
            </div>

            <button type="submit">Create Album</button>
        </form>
    </div>
)
}

export default AlbumFormPage
