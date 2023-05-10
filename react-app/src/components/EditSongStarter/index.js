import SongFormPage from "../SongFormPage";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOneSongThunk } from "../../store/songs";
// import { getOneAlbumThunk } from "../../store/albums";

const EditSongStarter = () => {
  const {songId} = useParams()
  const dispatch = useDispatch()
  const [song, setSong] = useState('')
  // const [album, setAlbum] = useState('')

  useEffect(() => {
    dispatch(getOneSongThunk(songId))
    .then(data => setSong(data))
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(getOneAlbumThunk(song.albumId))
  //   .then(data => setAlbum(data))
  // }, [song])

  // async function getSongData() {
  //   const songData = await dispatch(getOneSongThunk(songId));
  //   return songData;
  // }

  // const song = getSongData()

  // const song = dispatch(getOneSongThunk(songId))

  console.log('song inside EditSongStarter', song)
  // console.log('album inside EditSongStarter', album)

  if (!song) return null
  // if (!album) return null

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

export default EditSongStarter
