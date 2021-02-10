import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListadoLibros() {
  const [libros, setLibros] = useState([]);
  const [librosHtml, setLibrosHtml] = useState([]);

  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/libro');
        setLibros(response.data);
      }
      catch(e) {
        console.log('Error: ', e.response.data.Mensaje);
        setLibros([{id: 'Error', nombre: e.response.data.Mensaje}])
      }
    }
    connect();
  },[]);
  
  useEffect(()=>{
    const tbody = libros.map(libro =>(
      <tr>
        <td>{libro.id}</td>
        <td>{libro.nombre}</td>
        <td>{libro.descripcion}</td>
        <td>{libro.categoria_id}</td>
        <td>{libro.persona_id}</td>
      </tr>
    ));
    setLibrosHtml(tbody);
  },[libros]);

  return (
    <div>
      <h2>Libros</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoria Id</th>
            <th>Persona Id</th>
          </tr>
        </thead>
        <tbody>
          {librosHtml}
        </tbody>
      </table>
    </div>
  )
}
