import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { editSongThunk, getOneSongThunk } from "../../store/songs";
import SongDeleteModal from "../SongDeleteModal";
import OpenModalButton from "../OpenModalButton";
import AudioPlayer from "../ReactAudioPlayer/AudioPlayer";
<<<<<<< HEAD
import { AiFillLike } from "react-icons/ai";
=======
import './SongPageSingle.css';
import AddToPlaylistButton from "../AddToPlaylistButton";
import LikeComponent from "../LikeComponent";
>>>>>>> dev

function SongPageSingle() {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songs[songId]);
  //   const songLength = useSelector((state)=> Object.values(state.songs).length)

  // console.log("this is the length of the users songs", song);
  useEffect(() => {
  dispatch(getOneSongThunk(songId));
  }, [songId, dispatch]);

  console.log('song inside SongPageSingle', song)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(+(song?.likes))


  const addLike = () =>{
    setLiked(!liked)
    setLikeCount(likeCount + 1)

  }
  const removeLike = () =>{
    setLiked(!liked)
    setLikeCount(likeCount - 1)
  }


  if (!song) {
    return null;
  }


  return (
    <div id="singSongPage">
<<<<<<< HEAD
      <h1>single song page</h1>
      <AudioPlayer song={song} sessionUser={sessionUser} />
=======
      {/* <h1>single song page</h1> */}
      <AudioPlayer song={song} sessionUser={sessionUser}/>

      <div className="song-secondary-ui">
        <LikeComponent song={song} sessionUser={sessionUser}/>
        <AddToPlaylistButton song={song} />
        {sessionUser && sessionUser.id === song.ownerId && (
          <OpenModalButton buttonClass="song-del-btn" buttonText="Delete Song" modalComponent={<SongDeleteModal songId = {songId}/>} />
        )}
      </div>
      
>>>>>>> dev
      <div className="playlogo"></div>
      {/* <div>{song?.name}</div>
      <div>
        user name ? (owner id):{song?.ownerId} , style: {song?.styleId}
      </div>
      <div>album name? album id: {song?.albumId}</div>
      <div>wav thing</div>
<<<<<<< HEAD
      <div>{song?.coverImage}</div>
      <AiFillLike style={{ color: 'red' }} onClick={addLike}  />
      <div>{likeCount}</div>


      {sessionUser && sessionUser.id === song.ownerId && (
        <OpenModalButton buttonText="Delete Song" modalComponent={<SongDeleteModal songId={songId} />} />
      )}
=======
      <div>{song?.coverImage}</div> */}
>>>>>>> dev

    </div>
  );
}

export default SongPageSingle;
