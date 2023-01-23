import React, {useState} from 'react';
import './style.css';

const Header = ({ headerTitle = '', onSearch = () => {} }) => {
    const [songTitle,setSongTitle] = useState('');
    return (
        <div className='header'>
            <h2>{headerTitle}</h2>
            <div className='searchBox'>
                <input type="search" onChange={(e) => {setSongTitle(e.target.value)}} placeholder='Search song by title'></input>
                <button disabled={!songTitle} onClick={() => onSearch(songTitle)}>Get Song</button>
            </div>
        </div>
    )
}

export default Header;