import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function GamesDetails() {
    const [gamesDetails, setGamesDetails] = useState([]);
    const [loding, setLoding] = useState(true);
    let{id} = useParams();

    async function apiDetailsGame() {
        let {data} = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/game",{
            headers : {'X-RapidAPI-Key':
            'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'},
            params:{'id':`${id}`}
        })
        // console.log(data);
        setLoding(false)
        setGamesDetails(data)
    }
    useEffect(() => {
        apiDetailsGame()
    }, []);
    
  return <>
  
  {loding ==true?  
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
      <div >

         <div  className='container py-5 mt-5'>
          <div className='row'>
            <div className='col-md-4'>
                <div>
                    <img src={gamesDetails.thumbnail}  className='w-100 rounded-3'  alt="details" />
                    <a href={gamesDetails.freetogame_profile_url}><button className='btn btn-secondary mt-2'>Free</button></a>
                    <a href={gamesDetails.game_url}><button className='btn btn-primary px-5 mt-2 ms-3'>PLAY NOW <i className="fa-solid fa-right-from-bracket"></i></button></a>                  
                </div>
            </div>

            <div className='col-md-8'>
                <h2 className='gameover-text text-start'>{gamesDetails.title}</h2>
                <h4 className='mt-3 gameover-text text-start'>About {gamesDetails.title}</h4>
                <h6 className='lh-base gameover-text fw-light'>{gamesDetails.description}</h6>
                {/* Object.values(gamesDetails.minimum_system_requirements)  */}
                 {gamesDetails.screenshots != 0 ? <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {gamesDetails.screenshots?.map((screenshot,idx)=><div key={idx} className="carousel-item active" mouse="true">
                      <img src={screenshot.image} className="d-block w-100" alt="ImageGameSlider"/>
                      </div>) }               
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
                 </div>:""}
                
                {gamesDetails.minimum_system_requirements ?<div>
                <h5 className='gameover-text my-3'>Minimum System Requirements</h5>
                {gamesDetails.minimum_system_requirements.graphics? <h6 className='gameover-text '><span className='fw-bolder'>graphics</span> <span className='fw-light'>:{gamesDetails.minimum_system_requirements.graphics}</span></h6>:""}
                {gamesDetails.minimum_system_requirements.memory? <h6 className='gameover-text'><span className='fw-bolder'>memory</span> <span className='fw-light'>: {gamesDetails.minimum_system_requirements.memory}</span></h6>:""}
                {gamesDetails.minimum_system_requirements.os? <h6 className='gameover-text'><span className='fw-bolder'>os</span> <span className='fw-light'> : {gamesDetails.minimum_system_requirements.os}</span></h6>:""}
                {gamesDetails.minimum_system_requirements.processor? <h6 className='gameover-text'><span className='fw-bolder'>processor</span> <span className='fw-light'>:{gamesDetails.minimum_system_requirements.processor}</span></h6>:""}
                {gamesDetails.minimum_system_requirements.storage? <h6 className='gameover-text'><span className='fw-bolder'>storage</span> <span className='fw-light'>:{gamesDetails.minimum_system_requirements.storage}</span></h6>:""}
                </div> :""}              
            </div>
        </div>
       </div>
      </div>
        }
   

  </>
}
