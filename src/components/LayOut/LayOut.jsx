import React, { useContext, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { DataContext } from '../GamesContext/GamesContext';

export default function LayOut() {
    const Navigate = useNavigate()
    const {loginTkn,getTkn,removeToken} = useContext(DataContext);

    function logOut() {
      removeToken();
      Navigate('/login');
    }
    function checkReload() {
      if (localStorage.getItem('token') !=null && loginTkn == null) {
        getTkn();
      }
    }
    useEffect(() => {
      checkReload();
    });

  return <>
    <nav className="navbar navbar-expand-lg navbar-dark border border-bottom shadow-sm border border-dark fixed-top ">
  <div className="container">
    <img src="logo.png" className='navbar-logo' alt="logo" /> 
    <a className="navbar-brand me-auto" href="#"> Game Over</a>
    {loginTkn !=null?<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> :""}
    
    {loginTkn !=null?<div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-5 me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Games">All</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </Link>
          <ul className="dropdown-menu bg-dark ">
            <li><Link  className="dropdown-item text-white" to="/platform/pc">Pc</Link></li>
            <li><Link  className="dropdown-item text-white" to="/platform/browser">Browser</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown ">
          <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort-by
          </Link>
          <ul className="dropdown-menu bg-dark ">
            <li><Link  className="dropdown-item text-white" to="/sort-by/release-date">release-date</Link></li>
            <li><Link  className="dropdown-item text-white" to="/sort-by/Popularity">Popularity</Link></li>
            <li><Link className="dropdown-item text-white" to="/sort-by/alphabetical">alphabetical</Link></li>
            <li><Link className="dropdown-item text-white" to="/sort-by/relevance">relevance</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul className="dropdown-menu bg-dark ">
            <li><Link className="dropdown-item text-white" to="/category/racing">racing</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/sport">sport</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/social">social</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/shooter">shooter</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/open-world">open-world</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/zombie">zombie</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/fantasy">fantasy</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/action-rbg">action-rbg</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/action">action</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/flight">flight</Link></li>
            <li><Link className="dropdown-item text-white" to="/category/battle-royal">battle-royal</Link></li>
          </ul>
        </li>
      </ul>
      
      <button onClick={logOut} className="btn btn-outline-info" type="submit">Log Out</button>
  
    </div> :""}
    
  </div>
    </nav>
   
   <Outlet/>
  
  </>
}
