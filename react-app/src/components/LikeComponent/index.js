import { useDispatch } from "react-redux"
import { addLikeToSongThunk, deleteOneLikeThunk } from "../../store/songs"
import { useHistory } from "react-router-dom"


function LikeComponent({song, sessionUser}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const addLikeEvent = (e) => {
        e.preventDefault();
        dispatch(addLikeToSongThunk(song.id, sessionUser.id))
    }
    const deleteLikeEvent = (e) => {
        e.preventDefault();
        dispatch(deleteOneLikeThunk(song.id, sessionUser.id))
    }

    // console.log("song info like component : ", song.likes)
    let present = <button className="like-btn" onClick={addLikeEvent}> <img alt="upvote" src="https://i.imgur.com/4ypwWHc.png"/> </button>
    if (song.likes > 0) {
        present = <button className="like-btn" onClick={deleteLikeEvent}><img alt="downvote" src="https://i.imgur.com/vIiU19b.png"/>  </button>
    }
    // console.log("present taTION info like component : ", present)

    return (
        <div>
            {present}
            <h1>song likes : {song.likes}</h1>
        </div>)
}

export default LikeComponent
