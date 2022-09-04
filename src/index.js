import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VerPartidos from './components/VerPartidos';
import Login from './components/Login'; 
import ActualizarPartido from './components/ActualizarPartido';
import RegistrarPartido from './components/RegistrarPartido';
import Registro from './components/Registro';
import PageNotFound from './components/PageNotFoud';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='actualizarPartido/:idMatch' element={<ActualizarPartido />}/>
        <Route path='registrarPartido' element={<RegistrarPartido />}/>
        <Route path='verPartidos' element={<VerPartidos />}/>
        <Route path='registrarse' element={<Registro />}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
