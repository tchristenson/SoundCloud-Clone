import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function SongFormPage() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [runtime, setRuntime] = useState("");
    const [content, setContent] = useState("");
    // const [albumId, setAlbumId] = useState(0);
    const [style, setStyle] = useState("");

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Song Form</h1>
        </div>
    )
}