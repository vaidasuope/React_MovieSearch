import React from 'react';
import './movies.css';

const Movies = ({results, moreMovie}) => {

    return <div className="movie">
        {results.map((item) => (
            <div key={item.imdbID} className="movieCard">
                <h3>{item.Title} ({item.Year})</h3>
                <img src={item.Poster} alt={item.Title}/>
                <button className="moreBtn" onClick={()=> moreMovie(item.imdbID)}>MORE</button>
            </div>
        ))}
    </div>
}
export default Movies;