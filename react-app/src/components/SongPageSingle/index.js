import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllSongsThunk, getOneSongThunk } from "../../store/songs";

function SongPageSingle() {
    const dispatch = useDispatch();

    const { songId } = useParams();

    useEffect(() => {
        dispatch(getOneSongThunk(songId));
    }, [songId, dispatch]);

    const song = useSelector((state) => state.songs[songId]);

    if (!song) {
        return ( <h1>song not found</h1>)
    }

    return (
        <div id="singSongPage">
            <h1>single song page</h1>
            <div className="playlogo"></div>
            <div>{song.name}</div>
            <div>user name ? (owner id):{song.ownerId} , style: {song.styleId}</div>
            <div>album name? album id: {song.albumId}</div>
            <div>wav thing</div>
            <div>{song.coverImage}</div>
        </div>
    )
}

export default SongPageSingle;
