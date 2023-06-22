import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import styles from './SearchBar.module.css'
import { searchSongsAlbumsUsersThunk, clearSearchResultsThunk } from "../../store/search";
import { useHistory } from "react-router-dom";

function SearchBar() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [query, setQuery] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        await dispatch(clearSearchResultsThunk())
        await dispatch(searchSongsAlbumsUsersThunk(query))
        setQuery('')
        history.push('/search')
    }

    return (
            <div className={styles['search-bar-container']}>
                <input
                    className={styles['search-bar']}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    type='search'
                    placeholder="Search"
                />
                <div onClick={handleSearch} className={styles['search-button-container']}>
                    <div className={styles['search-button']}>Search</div>
                </div>
            </div>

    )
}

export default SearchBar
