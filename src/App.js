import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultMovie from './DefaultMovie';
import { Helmet } from "react-helmet";

function App() {
  const [text, setText] = useState("")
  const [movie, setMovie] = useState([])
  const [afterSearch, setClass] = useState("")


  const changeText = (event) => {
    setText(event.target.value);
  }
  const getMovie = (e) => {
    e.preventDefault();
    setClass('afterSearch')

    axios.get(`https://www.omdbapi.com/?s=${text}&apikey=2bef9eb7`).then((response) => {
      setMovie(response.data.Search)
    }).catch(err => {
      alert("Movie Not Foxund");
    })
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movie Search</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="React movie search project" />
      </Helmet>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Movie App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form className="d-flex" /*3*/ onSubmit={getMovie}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={text} onChange={changeText} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <DefaultMovie name={afterSearch} />
      <div className='container-fluid my-3 p-0'>
        <div className='row'>
          {
            movie.map((value, index) => {
              return (
                <div className='col-lg-3 col-md-4 col-sm-6'>
                  <div className="card" style={{ width: "16rem" }}>
                    <img src={value.Poster} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h3 className="card-title">{value.Year}</h3>
                      <h4 className="card-text">{value.Title}</h4>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>

  )
}


export default App;
