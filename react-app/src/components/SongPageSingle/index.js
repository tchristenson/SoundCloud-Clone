import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUsersSongsThunk, getOneSongThunk, deleteOneSongThunk } from "../../store/songs";
import AudioPlayer from "../ReactAudioPlayer/AudioPlayer";

function SongPageSingle() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const { songId } = useParams();
  const song = useSelector((state) => state.songs[songId]);
  //   const songLength = useSelector((state)=> Object.values(state.songs).length)

  console.log("this is the length of the users songs", song);
  useEffect(() => {
    dispatch(getOneSongThunk(songId));
  }, [songId, dispatch]);

  console.log("this is the users id", sessionUser);

  let buttonClass = "hidden";

  if (song && song.ownerId === sessionUser.id) {
    buttonClass = "show";
  }

  const deleteSong = (e) => {
    e.preventDefault();
    dispatch(deleteOneSongThunk(songId));
    // dispatch(getCurrentUsersSongsThunk())
    history.push("/songs/current");
  };

  if (!song) {
    return null;
  }

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
      <form onSubmit={deleteSong}>
        <button className={buttonClass} type="submit">
          {" "}
          <h1>delete a song</h1>
        </button>
      </form>
    </div>
  );
}

export default SongPageSingle;
