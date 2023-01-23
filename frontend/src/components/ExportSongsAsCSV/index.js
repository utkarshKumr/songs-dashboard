import React from 'react';
import { CSVLink } from "react-csv";
import './style.css';

const ExportSongsAsCSV  = ({data= [], fileName = 'file.csv'}) => {
    const headers = [
        { label: "Index", key: "id" },
        { label: "ID", key: "song_id" },
        { label: "Title", key: "title" },
        { label: "Star rating", key: "star_rating" },
        { label: "Danceability", key: "danceability" },
        { label: "Energy", key: "energy" },
        { label: "Mode", key: "mode" },
        { label: "Acousticness", key: "acousticness" },
        { label: "Tempo", key: "tempo" },
        { label: "Number of sections", key: "duration_ms" },
        { label: "Number of segments", key: "num_segments" },
      ];

      let csvReport = {
        data: data,
        headers: headers,
        filename: fileName
      };

      return (
        <button className='export-button'>
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
      </button>
      )
}

export default ExportSongsAsCSV;