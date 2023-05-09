import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAlbumThunk } from "../../store/albums";
import { useModal } from "../../context/Modal";

function AlbumDeleteModal({albumId}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()

        const deletedAlbum = await dispatch(deleteAlbumThunk(albumId));
        if (deletedAlbum.message === 'delete successful') {
            console.log('if deletedAlbum running')
            console.log('deletedAlbum', deletedAlbum)
            history.push("/albums/current");
            closeModal();
        }
    }

    return (
        <div>
            <h1>Delete Album?</h1>
            <form onSubmit={handleDelete}>
                <button type="submit">Yes, delete the album</button>
                <button onClick={closeModal}>No, keep this album</button>
            </form>
        </div>
    )
}

export default AlbumDeleteModal;
