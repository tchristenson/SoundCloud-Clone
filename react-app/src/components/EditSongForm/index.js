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

  useEffect(() => {
    if (song) {
      if (!sessionUser || sessionUser.id !== song.ownerId) {
        history.push('/')
      }
    }
  }, [song, sessionUser, history])

  const [name, setName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(0) // Need this to prefill the album dropdown with the current album
  const [styleId, setStyleId] = useState(0); //Need this to prefill the style dropdown with the current album
//   const [coverImage, setCoverImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Maybe this would be easier just with a use selector instead
  // of an albums slice of state? Or add to the backend route to include albums when returning a song
  useEffect(() => {
    dispatch(getCurrentUsersAlbumsThunk())
    .then((data) => setAlbums(data))
    console.log('albums inside of SongFormPage', albums)

    dispatch(getOneSongThunk(songId))

}, [dispatch])

  useEffect(() => {
    if (song) {
      setName(song.name)
      setSelectedAlbumId(song.albumId)
      setStyleId(song.styleId) // This isn't correctly filling in. Return album model with song from backend route?
    //   setSelectedAlbumId(song.albumId)
    //   setCoverImage(song.coverImage)
    }
  }, [song])

  useEffect(() => {
    const errors = [];
    // Only adding to the validation errors for fields that are nullable=False in the Song model
    if (!name) errors.push('Please enter a name!')
    if (!styleId) errors.push('Please enter a style!')
    setValidationErrors(errors)
}, [name, styleId])

  if (!song) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    setHasSubmitted(true)
    if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('album_id', +selectedAlbumId)
    // formData.append('cover_image', coverImage)
    formData.append('style_id', styleId)
    formData.append('id', song.id)
    // formData.append('content', song.content)

    for (let key of formData.entries()) {
      console.log(key[0] + '----->' + key[1]);
  }

    const editedSong = await dispatch(editSongThunk(formData))
    setName('')
    setAlbums([])
    setSelectedAlbumId('')
    setStyleId('')
    // setCoverImage('')
    setValidationErrors([])
    setHasSubmitted(false)

    history.push(`/songs/${editedSong.id}`)

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

            {/* <div className="form-input-box">
                <label>Cover Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    >
                </input>
            </div> */}
{/* defaultValue={albums?.Albums[selectedAlbumId]?.id} */}

            <div className="form-input-box">
                <label>Album:</label>
                <select required={true} onChange={(e) => setSelectedAlbumId(e.target.value)}>
                    <option value={0}>{'(select one)'}</option>
                    <option key={null} value={0}>{`No Album`}</option>
                    {albums && albums.Albums && (albums.Albums.map(album => (
                        <option key={album.id} value={album.id}>{album.name}</option>
                    )))}
                </select>
            </div>

            <div className="form-input-box">
                <label>Song Style:</label>
                <select required={true} value={styleId} onChange={(e) => setStyleId(e.target.value)}>
                    <option value={0}>{'(select one)'}</option>
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

            <button type="submit">Update Song</button>
        </form>
    </div>
)
}

export default EditSongFormPage
