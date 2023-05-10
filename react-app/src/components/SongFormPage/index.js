import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/songs";
import { getCurrentUsersAlbumsThunk } from "../../store/albums"

function SongFormPage({song, formType}) {

    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)

    // console.log('sessionUser inside SongFormPage', sessionUser)
    // console.log('song inside SongFormPage', song)

    if (formType === 'Edit Song') {
        if (!sessionUser || sessionUser.id != song.ownerId) {
            history.push('/')
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersAlbumsThunk())
        .then((data) => setAlbums(data))
        console.log('albums inside of SongFormPage', albums)
    }, [dispatch])


    const [name, setName] = useState(song ? song.name : "");
    const [runtime, setRuntime] = useState(song ? song.runtime : "");
    const [content, setContent] = useState(song ? song.content : "");
    const [albums, setAlbums] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState(song ? song.albumId : "") // Need to find a way to set this to the album name via redux or prop threading/context
    const [style, setStyle] = useState(""); // Need to find a way to set this to the style name via redux or prop threading/context
    const [coverImage, setCoverImage] = useState(song ? song.coverImage : "")

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
        formData.append('album_id', +selectedAlbumId)
        formData.append('cover_image', coverImage)
        formData.append('style', style)

        if (formType === 'Edit Song') { // Must still create backend route and frontend action/thunk/reducer
            // const editedSong = await dispatch(editSongThunk(formData))
            // history.push(`/songs/${editedSong.id}`)
        } else {
            const newSong = await dispatch(createSongThunk(formData))
            console.log("new song song song ===> :", newSong)
            history.push(`/songs/${newSong.id}`)
        }

        setName('')
        setRuntime('')
        setContent('')
        setAlbums([])
        setSelectedAlbumId('')
        setStyle('')
        setCoverImage('')
        setValidationErrors([])
        setHasSubmitted(false)

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
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        >
                    </input>
                </div>

                <div className="form-input-box">
                    <label>Content:</label>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setContent(e.target.files[0])}
                        >
                    </input>
                </div>

                <div className="form-input-box">
                    <label>Album:</label>
                    <select value={selectedAlbumId} onChange={(e) => setSelectedAlbumId(e.target.value)}>
                        {/* {console.log('typeof albums', typeof albums)}
                        {console.log('albums right before we map', albums)}
                        {console.log('albums.Albums right before we map', albums.Albums)} */}
                        {albums && albums.Albums && (albums.Albums.map(album => (
                            <option key={album.id} value={album.id}>{album.name}</option>
                        )))}
                    </select>
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

                <button type="submit">{formType === 'Edit Song' ? 'Update Song' : 'Create Song' }</button>
            </form>
        </div>
    )
}

export default SongFormPage
