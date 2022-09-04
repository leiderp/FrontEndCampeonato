import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();

  const [redirectInfo,setRedirect] = useState(null);

  const [userInfo,setInfo] = useState({
    username : "",
    password : "",
  });

  function handleSubmit(evt){

    const url = "http://127.0.0.1:5000/apiCampeonato/users/login";

    const base64Authorization = btoa(unescape(encodeURIComponent(userInfo.username+":"+userInfo.password)));

    const config = {
      headers:{
          "Content-Type": "application/json",
          "Authorization":"Basic "+base64Authorization
      }
    };

    Axios.get(url,config)
      .then((res) =>{
        if (res.data.statusCode === 200) {
            localStorage.setItem("accessToken", res.data.token);
            alert("Sesión Iniciada...")
            navigate("/verPartidos");
        }else{
            setRedirect(res.data.message);
        }
    });
    
    evt.preventDefault();
  }

  function handleChange(evt){
    
    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...userInfo,
      [name]: value, 
    };

    setInfo(newValues);

  }

  return (
  <div className='container'>

    <div className="sidenav">
      <p id="pWelcome">Bienvenido Web Campeonato</p>
      <hr></hr>
      <a className="loginPage" href="/login">Login</a>
      <a className="loginPage" href="/registrarse">Registro</a>
    </div>

    <div className="content">
      <div className="child">
        <h2>Bienvenido a la Web Campeonato</h2>
        <div className="login-page">
          <div className="form">
            <h4>Iniciar Sesión</h4>
            <form className="login-form" onSubmit={handleSubmit}>
              <input id="username" name="username" type="text" placeholder="username" value={userInfo.username} onChange={handleChange} required/>
              <input id="password" name="password" type="password" placeholder="password" value={userInfo.password} onChange={handleChange} required/>
              <button type='submit'>login</button>
              <p className="message">Aún no se ha registrado? <a href="/registrarse">Crear Cuenta</a></p>
              {redirectInfo !== null &&
                <span>Error: {redirectInfo}</span>
              }
            </form>
          </div>
        </div>
      </div> 
    </div>

  </div>
    
  );
}

export default Login;
