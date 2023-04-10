import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Reg() {
  const navigate = useNavigate()
  const [error, setError] = useState([]);
  const [apiAlreadyReg, setApiAlreadyReg] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [reloadIcon, setReloadIcon] = useState(true);

  const [gamer, setGamer] = useState({
    first_name:'',
    last_name:'',
    age:'',
    email:'',
    password:'',
  });
 

  function getGamer(e) {
    setApiMessage("")
    setError("");
    let newGamer = {...gamer};
    let gamerValue = e.target.value;
    newGamer[e.target.id]=gamerValue;
    setGamer(newGamer);
  }

  async function userApi() {
    let {data} = await axios.post('https://sticky-note-fe.vercel.app/signup',gamer)
    console.log(data.message);

      if (data.message ==="success") {
          // go to home
          console.log("done");
          navigate("/login")
      }
      else if (data.message ==="citizen validation failed: email: email already registered"){
        setApiAlreadyReg(data.message)
      }
      else{
        setApiMessage(data.message)
      }
      setReloadIcon(true)
  }

  function submitUser(e) {

    setReloadIcon(false)
    e.preventDefault();
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(5).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(12).max(60).required(),
      email: Joi.string().email({minDomainSegments:2 , tlds:{allow: ["com","net"]}}).required(),
      password :Joi.string().pattern(new RegExp("^[a-zA-Z0-9@#$%^&*/]{3,30}$"))
    })

    let validate = schema.validate( gamer, {abortEarly : false} );
    if (validate.error=== undefined ) {
      // call api
      userApi()
    }
    else{
      setError(validate.error.details)
      console.log(validate.error.details);
      setReloadIcon(true)
    }
  }

  function sendKey(key) {
   if (error.length !=0) {
    for (let i = 0; i < error.length; i++) {
      if (error[i].context.key == key) {
        return error[i].message
      }
    }
   }
  }


  return <>
  
    <div className='container py-5 '>
        <div className='row log-content shadow'>
            <div className='col-md-6 parent-gameover-img position-relative'>
              <div className='gameover-img '>
                    <img src="imgs/gaming.ebaf2ffc84f4451d.jpg" className='w-100' alt="gameover" />
                </div>
              </div>

            <div className='col-md-6 game-over-content log-content '>
              <div className='py-4'>
                <form onSubmit={submitUser}>
                    <h3 className='text-center text-ligth '>Create Account!</h3>
                    <div className='d-flex my-4'>
                    <input onChange={getGamer} id="first_name" type="text" className='form-control w-50 me-1 bg-dark border border-0 text-white' placeholder='FirstName' />
                    {sendKey("first_name")? <div className='text-danger'>The FirstName is Incorrect</div> :""}
                    <input onChange={getGamer} id="last_name" type="text" className='form-control w-50 me-1 bg-dark border border-0 text-white' placeholder='LastName' />
                    {sendKey("last_name")? <div className='text-danger'>The LastName is Incorrect</div>:""}
                    </div>
                    <input onChange={getGamer} id="email" type="email" className='form-control bg-dark border border-0 text-white' placeholder='Email Address' />
                    {sendKey("email")? <div className='text-danger'>Your Email is Incorrect</div>:""}
                    <input onChange={getGamer} id="age" type="number" className='form-control bg-dark border border-0 mt-3 text-white ' placeholder='Age' />
                    {sendKey("age")? <div className='text-danger '>Your Age must Be Between 18 and 60 years</div>:""}
                    <input onChange={getGamer} id="password" type="password" className='form-control bg-dark border border-0 mt-3 text-white' placeholder='Password' />
                    {sendKey("password")? <div className='text-danger '>Your Password is Incorrect</div>:""}
                    <button className='btn btn-secondary w-100 mt-3' type='submit'>Create Account  {reloadIcon == false? <i className="fa-solid fa-spinner fa-spin text-white"></i>   :""}  </button>
                    {apiMessage.length !=0 ? <div className='text-success '>Register</div> :""}
                    {apiAlreadyReg.length !=0 ? <div className='text-success text-center'>AlreadyRegister</div> :""}
                    <p className='text-muted p-2 text-center'>This site is protected by reCAPTCHA and the Google <a href="" className='text-muted'>Privacy Policy</a> and <a href="" className='text-muted'>Terms of Service</a> apply.</p>
                    <hr className='bg-muted'/>
                    <p className='text-center text-muted'>Already a member? <Link to="/login" className='text-decoration-none text-primary'>  Log In <i className="fa-solid fa-chevron-right fa-xs"></i></Link></p>
                </form>
              </div>
            </div>
        </div>
    </div>

  </>
}
