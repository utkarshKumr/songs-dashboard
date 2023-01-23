import React from 'react';
import Table from 'react-bootstrap/Table';
import { Rating } from 'react-simple-star-rating'

import useSortableData from '../../hooks/sortTableData';

import './style.css';

const SongsTable = ({ data = [], updateStarRatingCaller }) => {
    const { items, requestSort, sortConfig } = useSortableData(data);

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('id')}
                            className={getClassNamesFor('id')}
                        >
                            index
                        </button>

                    </th>
                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('song_id')}
                        className={getClassNamesFor('song_id')}
                    >
                        id
                    </button></th>
                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('title')}
                        className={getClassNamesFor('title')}
                    >
                        Title
                    </button></th>
                    <th>Star rating</th>
                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('danceability')}
                        className={getClassNamesFor('danceability')}
                    >
                        Danceability
                    </button></th>
                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('energy')}
                        className={getClassNamesFor('energy')}
                    >
                        Energy
                    </button></th>
                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('mode')}
                        className={getClassNamesFor('mode')}
                    >
                        Mode
                    </button></th>
                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('acousticness')}
                        className={getClassNamesFor('acousticness')}
                    >
                        Acousticness
                    </button></th>

                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('tempo')}
                        className={getClassNamesFor('tempo')}
                    >
                        Tempo
                    </button></th>

                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('duration_ms')}
                        className={getClassNamesFor('duration_ms')}
                    >
                        Duration (ms)
                    </button></th>

                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('num_sections')}
                        className={getClassNamesFor('num_sections')}
                    >
                        Number of sections
                    </button></th>
                    <th>                        <button
                        type="button"
                        onClick={() => requestSort('num_segments')}
                        className={getClassNamesFor('num_segments')}
                    >
                        Number of segments
                    </button></th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item, index) => {
                        const { id, acousticness = '', danceability = '', duration_ms = '', energy = '', mode = '', num_sections = '',
                            num_segments = '', song_id = '', star_rating = '', tempo = '', title = ''
                        } = item;

                        return (
                            <tr key={song_id}>
                                <td>{id}</td>
                                <td>{song_id}</td>
                                <td>{title}</td>
                                <td>
                                    <Rating onClick={(rate) => {updateStarRatingCaller(song_id, rate)}} initialValue={star_rating} />
                                </td>
                                <td>{danceability}</td>
                                <td>{energy}</td>
                                <td>{mode}</td>
                                <td>{acousticness}</td>
                                <td>{tempo}</td>
                                <td>{duration_ms}</td>
                                <td>{num_sections}</td>
                                <td>{num_segments}</td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );


}

export default SongsTable;