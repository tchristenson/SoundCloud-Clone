import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUsersSongsThunk } from "../../store/songs";
import './UsersSongPage.css';
import {  getCurrentUsersAlbumsThunk } from "../../store/albums";
import { getAllStylesThunk } from "../../store/styles";


function UsersSongsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersSongsThunk());
        dispatch(getCurrentUsersAlbumsThunk())
        dispatch(getAllStylesThunk())
    }, [dispatch]);

    const songs = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector((state) => Object.values(state.albums))
    const styles = useSelector(state => Object.values(state.styles))
    const albumIds = albums.map(album => {
      return album.name
    })


    const styleIds = styles.map(style =>
      style.genre)







    if(!songs || !albums) {
        return <h1>no current users songs found</h1>
    }

    return (
        // <div>
        //     <div>current users songs foundish</div>
        //     <div>{songs}</div>
        //     <h4>song name above?</h4>
        // </div>
        <div id="usersSongPage">

          <h1 className="user-songs-title">{sessionUser.username}'s Songs</h1>
        {songs?.map(({name, albumId, styleId, ownerId, runtime, coverImage, content, id})=>(
          <NavLink to={`/songs/${id}`} key={id}>
            <div className="song-div" key={id}>
              <div className="song-picture-div">
                <img alt="" className="song-picture" src={coverImage}/>
              </div>

              <div>
                <div className="playlogo"></div>
                <div className="song-name">Song name: {name}</div>
                <div>By {sessionUser.username}</div>
                <div>Genre: {styleIds[styleId - 1]}</div>
                <div>Album name: {albumIds[albumId - 1]} </div>

              </div>
            </div>
          </NavLink>
        ))}
      </div>
    )
}

export default UsersSongsPage;
