import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUsersAlbumsThunk } from "../../store/albums";

function UsersAlbumsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersAlbumsThunk());
    }, [dispatch])

    const albums = useSelector((state) => state.albums);
    console.log('user albums inside UsersAlbumsPage', albums)

    if (!albums) return null;

    const albumsArr = Object.values(albums)

    const albumList = albumsArr.map(album => (
        <div className="album-div">
            <div className="album-pic-div">
                <img className="album-pic" src={album.coverImage} />
            </div>
            <div>
                <div>{album.name}</div>
                <div></div>
            </div>
        </div>
    ))

    return (
        <div>
        {albumList}
        </div>
    )
}

export default UsersAlbumsPage;
