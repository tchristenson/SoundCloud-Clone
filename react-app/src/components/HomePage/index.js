import React, { useState } from "react";
import SongPage from "../SongPage";
import { getAllSongsThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import AudioPlayer from "../ReactAudioPlayer/AudioPlayer";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import './homepage.css'

import { useEffect } from "react";
import { faker } from "@faker-js/faker";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongsThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);
  const songs = useSelector((state) => Object.values(state.songs));
  const users = useSelector((state) => Object.values(state.users));

  const usersSong = users.filter((user) => user.id === songs.ownerId);
  console.log(usersSong);

  console.log("songs", songs);

  if (!songs) {
    return <h1>testerrrrr</h1>;
  }

  return (
    <>
    <main id='homePageStyle'>

   <div>
        <img alt="placeholder" src={faker.image.nightlife()} />
        <button>Sign up</button>
      </div>
      <div>
        <input type="search" placeholder="Search for artists, bands, tracks, and podcasts"></input> or
        <OpenModalButton buttonText="Upload your Song" onItemClick="" modalComponent={<LoginFormModal />} />
      </div>
      <h2>Hear what's trending for free in the Vibillow community</h2>
      <div id="mainPage">
        {songs?.map(({ name, albumId, styleId, ownerId, runtime, coverImage, content, id }) => (
          <div className="songDiv" key={id}>
            <div>
              <img alt="" src={coverImage} />
            </div>
            <div>{name}</div>

          </div>
        ))} <OpenModalButton buttonText="Explore trending playlists" onItemClick="" modalComponent={<LoginFormModal />} />
      </div>
      <section>


      </section>
    </main>


    </>
  );
}
export default HomePage;
