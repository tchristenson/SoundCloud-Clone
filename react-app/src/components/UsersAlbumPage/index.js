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
        <NavLink to={`/albums/${album.id}`}>
            <div>{album.name}</div>
        </NavLink>
    ))

    return (
        <div>
        {albumList}
        </div>
    )
}

export default UsersAlbumsPage;
