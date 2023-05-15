import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUsersAlbumsThunk } from "../../store/albums";
import './UsersAlbumPage.css';

function UsersAlbumsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersAlbumsThunk());
    }, [dispatch])

    const albums = useSelector((state) => state.albums);
    console.log('user albums inside UsersAlbumsPage', albums)
    const sessionUser = useSelector((state) => state.session.user);

    if (!albums) return null;

    const albumsArr = Object.values(albums)

    const albumList = albumsArr.map(album => (
        <NavLink to={`/albums/${album.id}`} key={album.id}>
            <div className="album-div">
                <div className="album-pic-div">
                    <img className="album-pic" src={album.coverImage} />
                </div>
                <div>
                    <div>{album.name}</div>
                    <div></div>
                </div>
            </div>
        </NavLink>
    ))

    return (
        <div className="user-album-page-div">
            <h1>{sessionUser.username}'s Albums</h1>

            <div>
                {albumList}
            </div>
        </div>
    )
}

export default UsersAlbumsPage;
