import { useDispatch } from "react-redux"
import { addLikeToSongThunk } from "../../store/songs"


function LikeComponent({song, sessionUser}) {
    const dispatch = useDispatch()

    const handleEvent = (e) => {
        e.preventDefault();
        dispatch(addLikeToSongThunk(song.id, sessionUser.id))
    }

    return (
        <div><h1>tester</h1>
        <div>{song.name}</div>
        {/* <div>{sessionUser.alias}</div> */}
        <button onClick={handleEvent}> like button </button>

        </div>)
}

export default LikeComponent
