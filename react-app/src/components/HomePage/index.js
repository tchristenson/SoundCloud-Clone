import React, { useState } from "react";
import SongPage from "../SongPage";
import { getAllSongsThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import AudioPlayer from "../ReactAudioPlayer/AudioPlayer";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import "./homepage.css";

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

  const newSong = songs.map((song) => {
    return song.ownerId;
  });

  console.log("these are the song owner ids", newSong);
  console.log("these are the users", users);

  if (!songs) {
    return <h1>testerrrrr</h1>;
  }

  return (
    <>
      <main id="homePage">
        <div>
          <img alt="placeholder" src={faker.image.nightlife()} className="mainImage" />
        </div>
        <div className='inputDiv'>
          <input type="search" placeholder="Search for artists, bands, tracks, and podcasts" size={"50"}></input> or
          <OpenModalButton buttonText="Upload your Song" onItemClick="" modalComponent={<LoginFormModal />} />
        </div>
        <h2>Hear what's trending for free in the Vibillow community</h2>
        <div id="songContainer">
          {songs?.map(({ name, coverImage, id }) => (
            <div className="songDiv" key={id}>
              <div>
                <a href={`/songs/${id}`}>
                  <img className="songImage" alt="" src={coverImage} />
                </a>
              </div>
              <div>{name}</div>
            </div>
          ))}{" "}
          <OpenModalButton buttonText="Explore trending playlists" onItemClick="" modalComponent={<LoginFormModal />} />
        </div>
        <section></section>
      </main>
    </>
  );
}
export default HomePage;
