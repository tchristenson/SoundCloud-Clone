import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllSongsThunk } from "../../store/songs";

function SongPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongsThunk());
  }, [dispatch]);
  const songs = useSelector((state) => Object.values(state.songs));

  console.log("songs", songs);

  if (!songs) {
    return <h1>testerrrrr</h1>;
  }
  return (
    <div id="songPage">
      {songs?.map(({name,albumId, styleId, ownerId, runtime, coverImage, content, id})=>(
        <div key={id}>
          <div className="playlogo"></div>
          <div>{name}</div>
          <div>artist name ? (artist id):{ownerId} , style: {styleId}</div>
          <div>album name? album id: {albumId}</div>
          <div>wav thing</div>
          <div>{coverImage}</div>
        </div>
      ))}
    </div>
  );
}

export default SongPage;
