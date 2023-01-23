import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import {getSongDetails, updateStarRating} from '../../apis/songs';
import './style.css';


const SongContainer = () => {

    const {songTitle} = useParams();
    const [songDetails, setSongDetails] = useState({});

    useEffect(() => {
        getSongDetails(songTitle).then(res => {
            setSongDetails(res)
          }).catch((err) => { throw (err) });
    },[]);

    const updateStarRatingCaller = async (song_id, star_rating) => {
        await updateStarRating(song_id, star_rating)
      }

    const {title = '', acousticness = '', danceability = '', energy= '', mode = '', star_rating = '', duration_ms = '', num_sections = '', song_id = '', message = ''} = songDetails;
    return(<div className='song-details-container-layout'>
        <div className='songDetails'>
            {title?<>
            <h2>Song title: {title}</h2>
            <p><Rating initialValue={star_rating} onClick={(rate) => {updateStarRatingCaller(song_id, rate)}} /></p>
            <p>Acousticness: {acousticness}</p>
            <p>Danceability: {danceability}</p>
            <p>Energy: {energy}</p>
            <p>Mode: {mode}</p>
            <p>Duration (ms): {duration_ms}</p>
            <p>Number of sections: {num_sections}</p>
            </>:
            <p>{message}</p>
            }
        </div>
        
        
        </div>)

};

export default SongContainer;