import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getOneSongThunk} from "../../store/songs";
import SongDeleteModal from "../SongDeleteModal";
import OpenModalButton from "../OpenModalButton";
import AudioPlayer from "../ReactAudioPlayer/AudioPlayer";

function SongPageSingle() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { songId } = useParams();
  //   const songLength = useSelector((state)=> Object.values(state.songs).length)

  // console.log("this is the length of the users songs", song);
  useEffect(() => {
    dispatch(getOneSongThunk(songId));
  }, [songId, dispatch]);

  const song = useSelector((state) => state.songs[songId]);

  if (!song) {
    return null;
  }

  console.log('song inside SongPageSingle', song)

  return (
    <div id="singSongPage">
      <h1>single song page</h1>
      <AudioPlayer song={song} sessionUser={sessionUser}/>
      <div className="playlogo"></div>
      <div>{song?.name}</div>
      <div>
        user name ? (owner id):{song?.ownerId} , style: {song?.styleId}
      </div>
      <div>album name? album id: {song?.albumId}</div>
      <div>wav thing</div>
      <div>{song?.coverImage}</div>

      {sessionUser && sessionUser.id === song.ownerId && (
        <OpenModalButton buttonText="Delete Song" modalComponent={<SongDeleteModal songId = {songId}/>} />
      )}

    </div>
  );
}

export default SongPageSingle;
