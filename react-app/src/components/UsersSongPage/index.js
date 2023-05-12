import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUsersSongsThunk } from "../../store/songs";
import './UsersSongPage.css';


function UsersSongsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersSongsThunk());
    }, [dispatch]);

    const songs = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    console.log(songs[0]);

    if(!songs) {
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
        {songs?.map(({name,albumId, styleId, ownerId, runtime, coverImage, content, id})=>(
          <NavLink to={`/songs/${id}`} key={id}>
            <div className="song-div" key={id}>
              <div className="song-picture-div">
                <img className="song-picture" src={coverImage}/>
              </div>
              
              <div>
                <div className="playlogo"></div>
                <div className="song-name">{name}</div>
                <div>By {sessionUser.username} (owner id):{ownerId} , style: {styleId}</div>
                <div>album name? album id: {albumId}</div>
                <div>wav thing</div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    )
}

export default UsersSongsPage;
