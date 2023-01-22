import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSongs, updateStarRating } from '../../apis/songs';

import SongsTable from '../../components/songsTable';
import './style.css';
const SongsContainer = () => {
  const pageLimit = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  let page = searchParams.get('page') || 1;
  page = parseInt(page)

  const [songsData, setSongsData] = useState([]);
  const [pageConfig, setPageConfig] = useState({page: page, next: false, pageLimit: pageLimit, totalPages: 0});

  useEffect(() => {
    fetchSongs(page, pageLimit).then(res => {
      let { data = '', ...args } = res
      data = JSON.parse(data)
      setPageConfig(args);
      setSongsData(data);
    }).catch((err) => { throw (err) });
  }, [page]);

  const updateStarRatingCaller = async (song_id, star_rating) =>{
    let res = await updateStarRating(song_id, star_rating)
    console.log(res);
  }



  return (
    <div>
      <SongsTable data={songsData} updateStarRatingCaller={updateStarRatingCaller}/>
      <div className='paginationButtonsContainer'>
        <div className='paginationButtonsInternal'>
          <button disabled={page==1} onClick={() => setSearchParams(prev => {
            return {...prev, page: page-1}
          })}>Prev</button>
          <span>{`Page: ${pageConfig.page} / ${pageConfig.totalPages}`}</span>
          <button disabled={!pageConfig.next} onClick={() => setSearchParams(prev => {
            return {...prev, page: page+1}
          })}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default SongsContainer;