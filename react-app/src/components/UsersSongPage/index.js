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
        <div>
            <div>current users songs foundish</div>
            <h1>{songs[0].name}</h1>
            <h4>song name above?</h4>
        </div>
    )
}

export default UsersSongsPage;
