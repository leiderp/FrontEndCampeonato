import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";

function FormVerPartido(props) {
  const navigate = useNavigate();

  const [matchInfo,setInfo] = useState({
    idPartido: props.id,
    fechaPartido: props.fecha,
    equipoLocal: props.eqLocal,
    gEquipoLocal: props.geqLocal === null? undefined:props.geqLocal,
    equipoVisitante: props.eqVisit,
    gEquipoVisitante: props.geqVisit === null? undefined:props.geqVisit,
    userCreador: props.userCreador,
  });

  function handleSubmit(evt){
    const pathgo = '/actualizarPartido/'+matchInfo.idPartido;
    navigate(pathgo);
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
    <div className="column">
        <h2>Partido: <span className="equipo1">Equipo 1</span> vs <span className="equipo2">Equipo 2</span></h2>
        <form className="partido-form" onSubmit={handleSubmit}>
            <input id='idPartido' type="hidden" name="idPartido" value={matchInfo.idPartido} onChange={handleChange} placeholder="Id" readOnly/>
            <input id='equipoLocal' name='equipoLocal' className="localEq" type="text" value={matchInfo.equipoLocal} onChange={handleChange} placeholder="Equipo Local" readOnly/>
            <span>:</span>
            <input id='gEquipoLocal' name='gEquipoLocal' className="localEq golesEq" type="text" value={matchInfo.gEquipoLocal} onChange={handleChange} placeholder="Goles Eq.Local" readOnly/>
            <span>-</span>
            <input id='equipoVisitante' name='EquipoVisitante' className="visitEq" type="text" value={matchInfo.equipoVisitante} onChange={handleChange} placeholder="Equipo Visitante" readOnly/>
            <span>:</span>
            <input id='gEquipoVisitante' name='gEquipoVisitante' className="visitEq golesEq" type="text" value={matchInfo.gEquipoVisitante} onChange={handleChange} placeholder="Goles Eq.Visitante" readOnly/>
            <span> Creado por: </span><input id='userCreador' name='userCreador' type="text" value={matchInfo.userCreador} onChange={handleChange} placeholder="Usuario" readOnly/>
            <span> Fecha Partido:</span> <input id='fechaPartido' name='fechaPartido' type="date" value={matchInfo.fechaPartido} onChange={handleChange} placeholder="Fecha Partido" readOnly/>
            <br></br>
            {matchInfo.gEquipoLocal === undefined && matchInfo.gEquipoVisitante === undefined &&
            <button type='submit'>Registrar Marcador</button>
            }
        </form>
    </div>
  );
}

export default FormVerPartido;
