import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUserFriends } from '@fortawesome/free-solid-svg-icons'

import LineaPersona from './LineaPersona'

export default function ListadoPersonas() {
  const [personas, setPersonas] = useState([]);
  const [personasHtml, setPersonasHtml] = useState([]);

  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/persona');
        setPersonas(response.data);
      }
      catch(e) {
        console.log('Error: ', e.response.status);
        setPersonas([{id: 'Error', nombre: e.response.status}])
      }
    }
    connect();
  },[]);
  
  useEffect(()=>{
    const tbody = personas.map(persona =>(
      <LineaPersona persona={persona} key={persona.id} />
    ));
    setPersonasHtml(tbody);
  },[personas]);

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faUserFriends} />
        Personas
      </h2>
      <a href='/personas/agregar'>
        <FontAwesomeIcon icon={faPlus} /> Agregar
      </a>
      <table border='1'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Alias</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {personasHtml}
        </tbody>
      </table>
    </div>
  )
}
