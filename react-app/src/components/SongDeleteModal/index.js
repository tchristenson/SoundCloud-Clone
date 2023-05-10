import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneSongThunk } from "../../store/songs";
import { useModal } from "../../context/Modal";

function SongDeleteModal({songId}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault()

    const deletedSong = await dispatch(deleteOneSongThunk(songId))
    if (deletedSong.message === 'delete successful') {
      console.log('if deletedSong running')
      console.log('deletedSong', deletedSong)
      history.push("/songs/current");
      closeModal();
    }
  }

  return (
    <div>
        <h1>Delete Song?</h1>
        <form onSubmit={handleDelete}>
            <button type="submit">Yes, delete the song</button>
            <button onClick={closeModal}>No, keep this song</button>
        </form>
    </div>
)
}

export default SongDeleteModal
