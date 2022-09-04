import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/actualizarPartido.css';

function ActualizarPartido() {

  const navigate = useNavigate();

  const { idMatch } = useParams();

  const logout =()=>{
    localStorage.setItem("accessToken", "");
    navigate("/login");
};

  const [matchInfo,setInfo] = useState({
    idPartido : "",
    fecha: "",
    eqLocal : "",
    geqLocal : "",
    eqvisitante : "",
    geqVisitante : "",
    usuariocreador : "",
  });

  useEffect(()=>
    {
      const config = {
        headers:{
            "x-access-tokens": localStorage.getItem("accessToken")
        }
      };

      const url = "http://127.0.0.1:5000/apiCampeonato/matchById/"+idMatch;
      

      Axios.get(url,config)
      .then((res) =>{
        if (res.data.statusCode === 200) {
          const newValues = {
            ...matchInfo,
            idPartido: res.data.data.id,
            fecha: res.data.data.fecha,
            eqLocal : res.data.data.local.nombre,
            geqLocal : res.data.data.goleslocal === null?"":res.data.data.goleslocal,
            eqvisitante : res.data.data.visitante.nombre,
            geqVisitante : res.data.data.golesvisitante === null?"":res.data.data.golesvisitante,
            usuariocreador : res.data.data.usuario.username,
          };
          setInfo(newValues);
        }
        else{
          navigate("/login");
        }
        
    });
    // eslint-disable-next-line
    },[navigate,idMatch]);
  


  function handleSubmit(evt){
    const config = {
      headers:{
          "x-access-tokens": localStorage.getItem("accessToken")
      }
    };

    const url = "http://127.0.0.1:5000/apiCampeonato/matches/"+idMatch;

    const data = {
      goleslocal:matchInfo.geqLocal, 
      golesvisitante:matchInfo.geqVisitante
    };

    Axios.put(url,data,config)
      .then((res) =>{
        if (res.data.statusCode === 200) {
          alert(res.data.message);
          navigate("/verPartidos");
        }
    });
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
        
        <div className="updateMatch-page">
            <div className="form">
            <h4>Actualizar Partido</h4>
            <form className="updateMatch-form" onSubmit={handleSubmit}>
                <input id="idPartido" name="idPartido" type="hidden" value={matchInfo.idPartido} onChange={handleChange} placeholder="id"/>
                <label htmlFor="fecha">Fecha Partido</label>
                <input type="date" placeholder="Fecha" id="fecha" name="fecha" value={matchInfo.fecha} onChange={handleChange} readOnly/>
                <label htmlFor="eqLocal">Equipo Local</label>
                <input type="text" placeholder="Equipo Local" id="eqLocal" name="eqLocal" value={matchInfo.eqLocal} onChange={handleChange} readOnly/>
                <label htmlFor="geqLocal">Goles Equipo Local</label>
                <input type="number" placeholder="Goles Equipo Local" id="geqLocal" name="geqLocal" min="0" value={matchInfo.geqLocal} onChange={handleChange} required/>
                <label htmlFor="eqvisitante">Equipo Visitante</label>
                <input type="text" placeholder="Equipo Visitante" id="eqvisitante" name="eqVisitante" value={matchInfo.eqvisitante} onChange={handleChange} readOnly/>
                <label htmlFor="geqVisitante">Goles Equipo Visitante</label>
                <input type="number" placeholder="Goles Equipo Visitante" min="0" id="geqVisitante" name="geqVisitante" value={matchInfo.geqVisitante} onChange={handleChange} required/>
                <input type="hidden" id="usuarioCreador" name="usuariocreador" placeholder="usuario Creador" value={matchInfo.usuariocreador} onChange={handleChange} />
                <button type='submit'>Actualizar Marcador</button>
            </form>
            </div>
        </div>
        </div> 
    </div>

  </div>
    
  );
}

export default ActualizarPartido;