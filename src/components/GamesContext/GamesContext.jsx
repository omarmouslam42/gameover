import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'


export const DataContext = createContext();
export default function GamesContext(props) {

   const [games, setGames] = useState([]);
   const [seeMore, setSeeMore] = useState(20);
   const [loadingScreen, setLoadingScreen] = useState(true);
   const [loginTkn, setloginTkn] = useState(null);
  
    async function ApiGames() {
        let {data} = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games" ,
        { headers: {'X-RapidAPI-Key':'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
        })
        // console.log(data);
        setGames(data);
        setLoadingScreen(false);
      }

      useEffect(() => {
        ApiGames()
      },[]);
  
      function getTkn() {
        if (localStorage.getItem("token")!==null) {
          let tokenUser =localStorage.getItem("token");
          let tknDecode = jwtDecode(tokenUser);
          // console.log(tknDecode);
          setloginTkn(tknDecode)
        }
      }
      
      function removeToken() {
        localStorage.removeItem("token");
        setloginTkn(null)
      }

      function MorePages() {
        setSeeMore((prevValue)=>prevValue+20)
      }


  return<DataContext.Provider value={{games , getTkn ,loginTkn,removeToken,loadingScreen,MorePages,seeMore} }>
  
  {props.children}
  
  </DataContext.Provider>
}
