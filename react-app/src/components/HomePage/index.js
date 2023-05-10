import React, { useState } from "react";
import SongPage from "../SongPage";
import { getAllSongsThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import AudioPlayer from "../ReactAudioPlayer/AudioPlayer";

import { useEffect } from "react";
import { faker } from "@faker-js/faker";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongsThunk());
    dispatch(getAllUsersThunk())
  }, [dispatch]);
  const songs = useSelector((state) => Object.values(state.songs));
  const users = useSelector(state=> Object.values(state.users))

  const usersSong = users.filter(user => user.id === songs.ownerId)
  console.log(usersSong)



  console.log("songs", songs);

  if (!songs) {
    return <h1>testerrrrr</h1>;
  }

  return (
    <>
      <div>
        <img alt="placeholder" src={faker.image.nightlife(150, 150)} />
      </div>
      <div id="songPage">
        {songs?.map(({ name, albumId, styleId, ownerId, runtime, coverImage, content, id }) => (
          <div key={id}>
            <div className="playlogo"></div>
            <div>{name}</div>
            <div>
              user name ? (owner id):{ownerId} , style: {styleId}
            </div>
            <div>album name? album id: {albumId}</div>
            <div>wav thing</div>
          </div>
        ))}
      </div>

    </>
  );
}
export default HomePage;
