import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../styles/registrarPartido.css';

function RegistrarPartido() {

    

    const navigate = useNavigate();

    const [infoEquipos, setInfoEquipos] = useState([]);

    const logout =()=>{
        localStorage.setItem("accessToken", "");
        navigate("/login");
    };

    useEffect(()=>
    {
      const config = {
        headers:{
            "x-access-tokens": localStorage.getItem("accessToken")
        }
      };

      const url = "http://127.0.0.1:5000/apiCampeonato/teams";
      

      Axios.get(url,config)
      .then((res) =>{
        if (res.data.statusCode === 200) {
          setInfoEquipos(res.data.data);
        }
        else{
          navigate("/login");
        }
        
    });

    },[navigate]);

    const [matchInfo,setInfo] = useState({
        fechaMatch: "",
        equipoLocal: "",
        equipoVisitante: "",
    });

    function handleSubmit(evt){
        const data ={
            "fecha":matchInfo.fechaMatch, 
            "local":matchInfo.equipoLocal, 
            "visitante":matchInfo.equipoVisitante
        };

        const config = {
            headers:{
                "x-access-tokens": localStorage.getItem("accessToken")
            }
          };
    
        const url = "http://127.0.0.1:5000/apiCampeonato/matches";

        Axios.post(url,data,config)
        .then((res) =>{
            if (res.data.statusCode === 200) {
                alert("Partido registrado con exito...")
                navigate("/verPartidos");
            }else{
                navigate("/login");
            }
        })
        evt.preventDefault();
    }
    
    function handleChange(evt){
        
        const { target } = evt;
        const { name, value } = target;
    
        const newValues = {
          ...matchInfo,
          [name]: value, 
        };
    
        setInfo(newValues);
    
    }
    
  return (
  <div className='container'>

    <div className="sidenav">
    <p id="pWelcome">Bienvenido Web Campeonato</p>
    <hr></hr>
    <a href="/verPartidos">Ver Partidos</a>
    <a href="/registrarPartido">Registrar Partido</a>
    <a href="/login" onClick={logout}>Log Out</a>
    </div>

    <div className="content">
    <div className="child">
        <h2>Bienvenido a la Web Campeonato</h2>
        <div className="registerMatch-page">
        <div className="form">
            <h4>Registrar Partido</h4>
            <form className="registerMatch-form" onSubmit={handleSubmit}>
                <input id="fechaMatch" name="fechaMatch" type="date" placeholder="Fecha" value={matchInfo.fechaMatch} onChange={handleChange} required/>
                <select name="equipoLocal" id="equipoLocal" value={matchInfo.equipoLocal} onChange={handleChange}>
                    <option value="" >Selecciona equipo Local</option>
                    {infoEquipos.map(
                        (equipo)=>(
                            <option key={equipo.idEquipo} value={equipo.idEquipo}> {equipo.nombreEquipo}</option>
                    ))}
                </select>
                <select name="equipoVisitante" id="equipoVisitante" value={matchInfo.equipoVisitante} onChange={handleChange}>
                    <option value="" >Selecciona equipo Visitante</option>
                    {infoEquipos.map(
                        (equipo)=>(
                            <option key={equipo.idEquipo} value={equipo.idEquipo}> {equipo.nombreEquipo}</option>
                    ))}
                </select>
                <button type='submit'>Registrar</button>
            </form>
        </div>
        </div>
    </div> 
    </div>

  </div>
    
  );
}

export default RegistrarPartido;