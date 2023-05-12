import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllSongsThunk } from "../../store/songs";
import './SongPage.css'

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
        <NavLink to={`/songs/${id}`} key={id}>
          <div className="song-div">
            <div className="song-picture-div">
              <img className="song-picture" src={coverImage}/>
            </div>

            <div>
              <div className="playlogo"></div>
              <div className="song-name">Title: {name}</div>
              <div>user name ? (owner id):{ownerId} , style: {styleId}</div>
              <div>album name? album id: {albumId}</div>
              <div>wav thing</div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default SongPage;
