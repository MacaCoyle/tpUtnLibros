import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <tr>
        <td>{persona.id}</td>
        <td>{persona.nombre}</td>
        <td>{persona.apellido}</td>
        <td>{persona.alias}</td>
        <td>{persona.email}</td>
      </tr>
    ));
    setPersonasHtml(tbody);
  },[personas]);

  return (
    <div>
      <h2>Personas</h2>
      <table>
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
