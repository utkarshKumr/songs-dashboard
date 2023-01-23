import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { fetchSongs, updateStarRating } from '../../apis/songs';
import ScatterChart from '../../components/Charts/scatterChart'
import HistogramChart from '../../components/Charts/histogramChart';
import SongsTable from '../../components/songsTable';
import Header from '../../components/Header';
import {SONG_DETAILS_PAGE_URL} from '../../urls/frontendUrls';
import './style.css';
const SongsContainer = () => {
  const pageLimit = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
    await updateStarRating(song_id, star_rating)
  }

  const onSearch = (songTitle) => {
    navigate(`/${SONG_DETAILS_PAGE_URL}/${songTitle}`);
  }


  return (
    <div class="container-layout">
      <Header headerTitle='Dashboard' onSearch={onSearch}/>
      <div class="chart-container-top">
        <div className='chartChild'><ScatterChart data={songsData} xKey={'id'} yKey={'danceability'} chartHeading={'Song ID vs Danceability'} /></div>
        <div className='chartChild'><HistogramChart data={songsData} xKey={'title'} yKey={'duration_ms'} chartHeading={'Song vs Duration'} legendHeading='Song duration (seconds)'
          chartColor="green"
          valueMultiplier = {1/1000}
        /></div>
        </div>
      <div className='tableAndPaginationAndLowerGraphs'>
      <div className='tableAndPaginationContainer'>
        <div className='tableContainer'>
          <SongsTable data={songsData} updateStarRatingCaller={updateStarRatingCaller} />
        </div>
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


    </div>

  );
}

export default SongsContainer;