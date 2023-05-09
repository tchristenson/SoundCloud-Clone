import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/songs";

function SongFormPage() {
    const dispatch = useDispatch();
    const history = useHistory()

    const [name, setName] = useState("");
    const [runtime, setRuntime] = useState("");
    const [content, setContent] = useState("");
    const [albumId, setAlbumId] = useState(0); // Placeholder as an integer until we refactor it into a drop down
    const [style, setStyle] = useState("");
    const [coverImage, setCoverImage] = useState("")

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

        const formData = new FormData()
        formData.append('name', name)
        formData.append('runtime', runtime)
        formData.append('content', content)
        formData.append('album_id', albumId) // Placeholder as an integer until we refactor it into a drop down
        formData.append('cover_image', coverImage)
        formData.append('style', style)

        const newSong = await dispatch(createSongThunk(formData))

        setName('')
        setRuntime('')
        setContent('')
        setAlbumId(0) // Placeholder as an integer until we refactor it into a drop down
        setStyle('')
        setCoverImage('')
        setValidationErrors([])
        setHasSubmitted(false)
        history.push(`/songs/${newSong.id}`) // Placeholder - will eventually redirect to the Song's ID page

    }

    useEffect(() => {
        const errors = [];
        // Only adding to the validation errors for fields that are nullable=False in the Song model
        if (!name) errors.push('Please enter a name!')
        if (!content) errors.push('Please provide an audio file!')
        setValidationErrors(errors)
    }, [name, content])

    return (
        <div>
            <h1>Create a New Song</h1>
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
                    <label>Song Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required={true}
                        >
                    </input>
                </div>

                <div className="form-input-box">
                    <label>Runtime:</label>
                    <input
                        type="text"
                        onChange={(e) => setRuntime(e.target.value)}
                        value={runtime}
                        >
                    </input>
                </div>

                <div className="form-input-box">
                    <label>Cover Image:</label>
                    <input
                        type="text"
                        onChange={(e) => setCoverImage(e.target.value)}
                        value={coverImage}
                        >
                    </input>
                </div>

                <div className="form-input-box">
                    <label>Content:</label>
                    <input
                        type="text" // Placeholder - will need to change this a 'file' type
                        // accept="" // Placeholder - will need to accept only certain types of audio files
                        onChange={(e) => setContent(e.target.value)} // Placeholder - will eventually change to {(e) => setContent(e.target.files[0])}
                        value={content}
                        required={true}
                        >
                    </input>
                </div>

                <div className="form-input-box">
                    <label>Album Id:</label>
                    <input
                        type="number" // Placeholder until we change this to a dropdown of the user's albums
                        onChange={(e) => setAlbumId(e.target.value)}
                        value={albumId}
                        >
                    </input>
                </div>

                <div className="form-input-box">
                    <label>Song Style:</label>
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

                <button>Create Song</button>
            </form>
        </div>
    )
}

export default SongFormPage
