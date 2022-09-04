import React, { useState } from 'react';
import Axios from 'axios';
import '../styles/registro.css';
import { useNavigate } from "react-router-dom";

function Registro() {
    const navigate = useNavigate();

    const [redirectInfo,setRedirect] = useState(null);

    const [userInfo,setInfo] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
    });

    function handleSubmit(evt){
        const url = "http://127.0.0.1:5000/apiCampeonato/users/register";

        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        };

        const data = {
            nombre:userInfo.name, 
            correo:userInfo.email, 
            username:userInfo.username,
            password:userInfo.password
        };

        Axios.post(url,data,config)
        .then((res) =>{
            if (res.data.statusCode === 200) {
                alert("Usuario registrado con exito. Porfavor Inicie Sesión...")
                navigate("/login");
            }else{
                setRedirect(res.data.Error);
            }
        })
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
            <a href="/login">Login</a>
            <a href="/registrarse">Registro</a>
        </div>

        <div className="content">
            <div className="child">
                <h2>Bienvenido a la Web Campeonato</h2>
                <div className="register-page">
                <div className="form">
                    <h4>Registrarse</h4>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input id='name' name='name' type="text" placeholder="name" value={userInfo.name} onChange={handleChange} required/>
                        <input id='username' name='username' type="text" placeholder="username" value={userInfo.username} onChange={handleChange} required/>
                        <input id='password' name='password' type="password" placeholder="password" value={userInfo.password} onChange={handleChange} required/>
                        <input id='email' name='email' type="text" placeholder="email" value={userInfo.email} onChange={handleChange} required/>
                        <button type='submit'>Registrar</button>
                        <p className="message">Ya estas registrado? <a href="/login">Login</a></p>
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

  export default Registro;