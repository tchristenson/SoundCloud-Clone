import { useModal } from "../../context/Modal"
import { useState } from "react"








function PlaylistModal({ playlists, song }) {
    const [playlistId, setPlaylistId] = useState(0)

    console.log('playlistmodal playlists', playlists)
    const { closeModal } = useModal()

    const addToPlaylist = async (e, playlistId) => {
        e.preventDefault()
        console.log(playlistId)






    }




    return (
        <form>
            <div>
                {playlists.map(playlist => (
                    <button key={playlist.id} value={playlist.id} onClick={ e => addToPlaylist(e, playlist.id)}>{playlist.name}
                    </button>



                ))}

            </div>
            </form>
    )

}
export default PlaylistModal
