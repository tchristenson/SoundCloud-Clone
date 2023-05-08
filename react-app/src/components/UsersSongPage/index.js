import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUsersSongsThunk } from "../../store/songs";


function UsersSongsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersSongsThunk());
    }, [dispatch]);

    const songs = useSelector((state) => Object.values(state.songs));

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
        {songs?.map(({name,albumId, styleId, ownerId, runtime, coverImage, content, id})=>(
          <div key={id}>
            <div className="playlogo"></div>
            <div>{name}</div>
            <div>user name ? (owner id):{ownerId} , style: {styleId}</div>
            <div>album name? album id: {albumId}</div>
            <div>wav thing</div>
            <div>{coverImage}</div>
          </div>
        ))}
      </div>
    )
}

export default UsersSongsPage;
