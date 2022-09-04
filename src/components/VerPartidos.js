import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../styles/verPartidos.css';
import FormVerPartido from './FormVerPartido';

function VerPartidos() {
  const navigate = useNavigate();

  const [listaPartidos, setListaPartidos] = useState([]);

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

      const url = "http://127.0.0.1:5000/apiCampeonato/matches";

      Axios.get(url,config)
      .then((res) =>{
        if (res.data.statusCode === 200) {
          setListaPartidos(res.data.data);
        }
        else{
          navigate("/login");
        }
        
    });
    },[navigate, setListaPartidos]);


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
        <div className="listPartidos-page">
        <div className="formMatch">
            <h4>Lista de Partidos</h4>
            <div className="row">
              {listaPartidos.map(
                (partido)=>(
                  <FormVerPartido key={partido.id} id={partido.id} fecha={partido.fecha} eqLocal={partido.local.nombre} geqLocal={partido.goleslocal}  eqVisit={partido.visitante.nombre} geqVisit={partido.golesvisitante} userCreador={partido.usuario.username}/>
                ))}
            </div>
        </div>
        </div>
    </div> 
    </div>

  </div>
    
  );
}

export default VerPartidos;