import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSongs, updateStarRating } from '../../apis/songs';
import ScatterChart from '../../components/Charts/scatterChart'
import HistogramChart from '../../components/Charts/histogramChart';
import SongsTable from '../../components/songsTable';
import './style.css';
const SongsContainer = () => {
  const pageLimit = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  let page = searchParams.get('page') || 1;
  page = parseInt(page)

  const [songsData, setSongsData] = useState([]);
  const [pageConfig, setPageConfig] = useState({ page: page, next: false, pageLimit: pageLimit, totalPages: 0 });

  useEffect(() => {
    fetchSongs(page, pageLimit).then(res => {
      let { data = '', ...args } = res
      setPageConfig(args);
      setSongsData(data);
    }).catch((err) => { throw (err) });
  }, [page]);

  const updateStarRatingCaller = async (song_id, star_rating) => {
    let res = await updateStarRating(song_id, star_rating)
    console.log(res);
  }



  return (
    <div class="container-layout">
      <SongsTable data={songsData} updateStarRatingCaller={updateStarRatingCaller} />
      <div className='paginationButtonsContainer'>
        <div className='paginationButtonsInternal'>
          <button disabled={page == 1} onClick={() => setSearchParams(prev => {
            return { ...prev, page: page - 1 }
          })}>Prev</button>
          <span>{`Page: ${pageConfig.page} / ${pageConfig.totalPages}`}</span>
          <button disabled={!pageConfig.next} onClick={() => setSearchParams(prev => {
            return { ...prev, page: page + 1 }
          })}>Next</button>
        </div>
      </div>

      <div class="chart-container">
        <div className='chartChild'><ScatterChart data={songsData} xKey={'id'} yKey={'danceability'} chartHeading={'Danceability'} /></div>
        <div className='chartChild'><HistogramChart data={songsData} xKey={'title'} yKey={'duration_ms'} chartHeading={'Song vs Duration (ms)'} legendHeading='Song duration (ms)'
        chartColor="green"
        /></div>
      </div>
      <div class="chart-container">
      <div className='chartChild'><HistogramChart data={songsData} xKey={'title'} yKey={'acousticness'} chartHeading={'Song vs Acousticness'} legendHeading='Acousticness' 
      chartColor="blue"
      /></div>

      <div className='chartChild'><HistogramChart data={songsData} xKey={'title'} yKey={'tempo'} chartHeading={'Song vs Tempo'} legendHeading='Tempo' 
      chartColor="red"
      /></div>

      </div>

    </div>

  );
}

export default SongsContainer;