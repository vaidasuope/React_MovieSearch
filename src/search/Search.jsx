import React, {useState, useEffect, useRef} from 'react';
import './search.css';
import Movies from "../movies/Movies";
import OneMovie from "../oneMovie/OneMovie";
import cinema from "../img/cinema.png";


export default function Search () {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [chosen, setChosen] = useState({});
    const inputRef = useRef(null);


    function onSubmit (e) {
    e.preventDefault();
    if (search===""){
        alert("Please fill in search field!")
        inputRef.current && inputRef.current.focus();
    } else {
        setQuery(search);
        setSearch('');
    }
    }

    // useEffect(() => {
    //     inputRef.current && inputRef.current.focus();
    //     },[])

    useEffect(() => {
        const fetchData = () => {
            fetch(`https://www.omdbapi.com/?apikey=e4db3ced&s=${query}`)
            .then((response)=>response.json())
                .then(movies => {
                    //console.log(movies.Search)
                    setResults(
                        movies.Search.map(item => {
                            return item;
                        })
                    )
                })
        }
        if (query!==''){
            fetchData();
        }
        //inputRef.current && inputRef.current.focus();
    },[query]);

    const moreMovie = async (id) => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=e4db3ced&i=${id}`);
        const movies = await response.json();
        //console.log(movies);
        setChosen (movies);
    }

    //moreMovie();

    useEffect(() => {
        console.log("useEffect2")
        moreMovie();
    },[])

    const goBack = () => {
        setChosen({})
        //inputRef.current && inputRef.current.focus();
    }

    return (
        <div>
            <div className="search">
                <div className="header">
                <h1>MOVIE </h1>
                <img className="logo" src={cinema} alt="Not found"/>
                <h1>SEARCH</h1>
                </div>
            <form onSubmit={onSubmit}>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search for movie"
                    ref={inputRef}
                />
                <button type="submit">SEARCH</button>
            </form>
            </div>
            <Movies results={results} moreMovie={moreMovie}/>
            {(typeof chosen.Title != "undefined") ? <OneMovie chosen={chosen} goBack={goBack}/> : false}
        </div>
    )
}
