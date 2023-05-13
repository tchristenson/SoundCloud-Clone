import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlaylistThunk } from "../../store/playlists";











function PlaylistFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");



    const playlistData = new FormData()

    playlistData.append('name', name)
    playlistData.append('')










}

export default PlaylistFormPage
