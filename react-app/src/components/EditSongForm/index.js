import SongFormPage from "../SongFormPage";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneSongThunk } from "../../store/songs";
import { getCurrentUsersAlbumsThunk } from "../../store/albums";
import { editSongThunk } from "../../store/songs";

const EditSongFormPage = () => {
  const {songId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  console.log('songId inside EditSongFormPage', songId)

  const sessionUser = useSelector(state => state.session.user)
  const song = useSelector(state => state.songs[songId])
  console.log('song inside EditSongFormPage', song)

  // if (!sessionUser || sessionUser.id != song.ownerId) {
  //   history.push('/')
  // }

  const [name, setName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState('') // Need this to prefill the album dropdown with the current album
  const [style, setStyle] = useState(''); //Need this to prefill the style dropdown with the current album
  const [coverImage, setCoverImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Maybe this would be easier just with a use selector instead
  // of an albums slice of state? Or add to the backend route to include albums when returning a song
  useEffect(() => {
    dispatch(getCurrentUsersAlbumsThunk())
    .then((data) => setAlbums(data))
    console.log('albums inside of SongFormPage', albums)
}, [dispatch])

  useEffect(() => {
    dispatch(getOneSongThunk(songId))
  }, [dispatch])

  useEffect(() => {
    if (song) {
      setName(song.name)
      setSelectedAlbumId(song.albumId)
      setStyle(song.styleId)
      setCoverImage(song.coverImage)
    }
  }, [song])

  useEffect(() => {
    const errors = [];
    // Only adding to the validation errors for fields that are nullable=False in the Song model
    if (!name) errors.push('Please enter a name!')
    setValidationErrors(errors)
}, [name])

  if (!song) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    setHasSubmitted(true)
    if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('album_id', +selectedAlbumId)
    formData.append('cover_image', coverImage)
    formData.append('style', style)
    formData.append('id', song.id)
    // formData.append('content', song.content)

    for (let key of formData.entries()) {
      console.log(key[0] + '----->' + key[1]);
  }

    const editedSong = await dispatch(editSongThunk(formData))
    history.push(`/songs/${editedSong.id}`)

    setName('')
    setAlbums([])
    setSelectedAlbumId('')
    setStyle('')
    setCoverImage('')
    setValidationErrors([])
    setHasSubmitted(false)
  }

  return (
    <div>
        <h1>Update your Song</h1>
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
                <label>Cover Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    >
                </input>
            </div>

            <div className="form-input-box">
                <label>Album:</label>
                <select value={selectedAlbumId} onChange={(e) => setSelectedAlbumId(e.target.value)}>
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

            <button type="submit">Update Song</button>
        </form>
    </div>
)
}

export default EditSongFormPage
