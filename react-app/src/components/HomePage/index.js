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
  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(getAllSongsThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);
  const songs = useSelector((state) => Object.values(state.songs));
  const users = useSelector((state) => Object.values(state.users));
  const sessionUser = useSelector(state => state.session.user)

  const newSong = songs.map((song) => {
    return song.ownerId;
  });

  const searchSongs = e =>{
    e.preventDefault()
    setQuery(e.target.value)
  }

  if(query.length){
    songs.filter(song =>{
      return song.name === (query)
    })
  }

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
          <input type="search" placeholder="Search for artists, bands, tracks, and podcasts" size={"50"} onChange={searchSongs} value={query}></input> or
         { <OpenModalButton buttonText="Upload your Song" onItemClick="" modalComponent={<LoginFormModal />} />}
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
          { sessionUser && <OpenModalButton buttonText="Explore trending playlists" onItemClick="" modalComponent={<LoginFormModal />} />}
        </div>
        <section></section>
      </main>
    </>
  );
}
export default HomePage;
