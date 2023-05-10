import SongFormPage from "../SongFormPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneSongThunk } from "../../store/songs";
import { getCurrentUsersAlbumsThunk } from "../../store/albums";

const EditSongFormPage = () => {
  const {songId} = useParams()
  const dispatch = useDispatch()

  const [name, setName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState('') // Need this to prefill the album dropdown with the current album
  const [style, setStyle] = useState(''); //Need this to prefill the style dropdown with the current album
  const [coverImage, setCoverImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const song = useSelector(state => state.songs[songId])

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




  if (!song) return null

  console.log('song inside EditSongStarter', song)


  return (
    Object.keys(song).length > 1 && (
      <>
        <SongFormPage
          song = {song}
          formType = 'Edit Song'
        />
      </>
    )
  )

}

export default EditSongFormPage
