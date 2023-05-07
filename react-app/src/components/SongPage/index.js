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
    // <div>
    //   <div>{songs[0].name}</div>
    //   <div>Song Page response</div>
    // </div>

    <div id="songPage">
      {songs?.map(({name, runtime, coverImage, content, id})=>(
        <div key={id}>{name}</div>
      ))}
    </div>
  );
}

export default SongPage;
