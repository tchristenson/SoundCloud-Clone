import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import UserProfilePage from "./components/UserProfilePage";
import SongPage from "./components/SongPage";
import SongPageSingle from "./components/SongPageSingle";
import AlbumPage from "./components/AlbumPage";
import AllAlbums from "./components/AllAlbums";
import UsersSongsPage from "./components/UsersSongPage";
import UsersAlbumsPage from "./components/UsersAlbumPage";
import SongFormPage from "./components/SongFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/users/:userId">
            <UserProfilePage />
          </Route>
          <Route exact path="/songs">
            <SongPage />
          </Route>
          <Route exact path="/songs/current">
            <UsersSongsPage />
          </Route>
          <Route exact path="/songs/:songId">
            <SongPageSingle />
          </Route>
          <Route exact path="/albums">
            <AllAlbums />
          </Route>
          <Route exact path="/albums/current">
            <UsersAlbumsPage />
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumPage />
          </Route>
          <Route exact path="/songs/new">
            <SongFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
