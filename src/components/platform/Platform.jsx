import axios from "axios"
import { useState, useEffect, useContext } from 'react';
import React from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../GamesContext/GamesContext";


export default function Platform() {
    const [games, setGames] = useState([]);
    let {pf} = useParams()
    const [loading, setLoading] = useState(true);
    const {MorePages,seeMore} = useContext(DataContext);
    async function gamesApi() {
        let {data}= await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{
        headers: {'X-RapidAPI-Key':
        'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
         'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'},
         params:{"platform":`${pf}`}})
        // console.log(data);
        setLoading(false)
        setGames(data)}
   
        useEffect(() => {
        gamesApi()
        }, []);

return<>
 {loading ===true?
     <div className="reload-background vh-100  d-flex justify-content-center align-items-center ">
      <div className="sk-wave">
          <div className="sk-wave-rect bg-danger"></div>
          <div className="sk-wave-rect bg-danger"></div>
          <div className="sk-wave-rect bg-danger"></div>
          <div className="sk-wave-rect bg-danger"></div>
          <div className="sk-wave-rect bg-danger"></div>
           </div>
     </div>
     :
     <div className='container py-5 mt-4'>
    
    <div className='row g-3 '>

     {games?.slice(0,seeMore).map((game,idx)=>
     
       <div key={idx} className='col-md-4 col-sm-6 col-lg-3'>
        <Link to={`/GamesDetails/${game.id}`}>
        <div className='game  h-100 shadow rounded-2 '>
         <img src={game.thumbnail} className='w-100' alt="nord" />
            <div className='p-3 card-body'>
            <div className=' d-flex justify-content-between'>
               <h6 className='gameover-text card-title'>{game.title}</h6>
               <div>
               <span className='p-1 btn btn-sm btn-primary text-white h-100'>Free</span>
               </div>
            </div>
            {/* game.short_description?.split(' ').splice(0,3).join(' ')? */}
            <p className='gameover-text text-start'>{game.platform}</p>
            <div className='d-flex justify-content-between'>
            <i className="fa-solid fa-square-plus gameover-text"></i>
            <div>
              <span className='gameover-text p-1 rounded-5 bg-secondary f'>{game.genre}</span>
              {game.platform ==="PC (Windows)"? <i className="ms-1 fa-brands fa-windows gameover-text"></i>:
              <i className="ms-1 fa-solid fa-window-maximize gameover-text"></i>}
            </div>
            </div>
            </div>
       </div>
       </Link>
     </div>
     )}
    </div>

    <div className='d-flex justify-content-center  mt-3'>
     <button onClick={MorePages} className='btn btn-outline-secondary'>See More</button>
    </div>
     </div>
      }

</>

}