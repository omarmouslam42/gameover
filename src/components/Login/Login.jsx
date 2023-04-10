import axios from 'axios';
import Joi from 'joi';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../GamesContext/GamesContext';

 function Login() {
  const navigate = useNavigate()
  const [apiMessage, setApiMessage] = useState("");
  const [errores, setErrores] = useState([]);
  const [reloadIcon, setReloadIcon] = useState(true);
  const {getTkn} = useContext(DataContext)

  const [getData, setGetData] = useState({
    email:"",
    password:"",
  });

  function getGamer(e) {
    setErrores("")
    setApiMessage("")
    let gamer = {...getData};
    let gamerValue= e.target.value;
    gamer[e.target.id]=gamerValue;
    setGetData(gamer)
  }

  async function loginApi() {
    let{data}= await axios.post(`https://sticky-note-fe.vercel.app/signin`,getData)
    // console.log(data);
    if (data.message==="success") {
      // console.log("login");
      navigate("/Home")
      localStorage.setItem("token",data.token)
      getTkn();
    }
    else{
      setApiMessage(data.message)
    }
    setReloadIcon(true)
  }
  

  function submit(e) {
    setReloadIcon(false)
    e.preventDefault();
    const schema = Joi.object({
    email: Joi.string().email({minDomainSegments:2 , tlds:{allow: ["com","net"]}}).required(),
    password :Joi.string().pattern(new RegExp("^[a-zA-Z0-9@#$%^&*/]{3,30}$"))
    })
    let validate = schema.validate(getData , { abortEarly : false});
    if (validate.error=== undefined) {
      //call api
      loginApi();
    }
    else{
      setErrores(validate.error.details);
      setReloadIcon(true)
      // console.log(validate.error.details);
    }
  }


  function sendKey(key) {
    if (errores.length !== 0) {
      for (let i = 0; i < errores.length; i++) {
        if (errores[i].context.key===key) {
          return errores[i].message
        }
      }
    }
  }
 
  return <>
     <div className='container py-5 '>
        <div className='row log-content shadow'>
            <div className='col-md-6 parent-gameover-img position-relative'>
              <div className='gameover-img '>
                    <img src="gaming.ebaf2ffc84f4451d.jpg" className='w-100' alt="gameover" />
                </div>
              </div>

            <div className='col-md-6 game-over-content log-content '>
              <div className='py-4 w-75 m-auto text-center'>
                <form onSubmit={submit}>
                    <img src="logo.png" className='w-25' alt="gameOverLogo" />
                    <h4 className='text-center gameover-text py-4'>Login GameOver</h4>   
                    <input onChange={getGamer} id="email" type="email" className='form-control text-black border border-0  ' placeholder='Email Address' />
                    {sendKey("email")? <div className='text-danger text-start'><i className="fa-solid fa-circle-xmark text-danger"></i>  your email is incorrect</div>:""}
                    <input  onChange={getGamer} id="password" type="password" className='form-control text-black border border-0 mt-3 ' placeholder='Password' />
                    {sendKey("password")? <div className='text-danger text-start'><i className="fa-solid fa-circle-xmark text-danger"></i>   your password is incorrect </div>:""}
                    {apiMessage.length !==0 ? <div className='text-danger ms-3'>{apiMessage}</div> :""}
                    <button className='btn btn-secondary w-100 mt-3'>Login {reloadIcon === false? <i className="fa-solid fa-spinner fa-spin text-white"></i>:""  }</button>
                    <hr className='bg-muted'/>
                    <Link className='my-3 text-decoration-none fs-6 '>Forgot Password?</Link>
                    <p className='text-center gameover-text mt-1'>Not a member yet? <Link to="/Reg" className='text-decoration-none text-primary'> Create Account <i className="fa-solid fa-chevron-right fa-xs"></i></Link></p>
                </form>
              </div>
            </div>
        </div>
     </div>
  
  </>
}
export default Login
