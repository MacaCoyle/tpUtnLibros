import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

export default function ListadoLibros({ categoria }) {
  const [libros, setLibros] = useState([]);
  const [librosHtml, setLibrosHtml] = useState([]);

  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/libro');
        if (categoria) {
          // Libros filtrados por categoria
          // TODO: Usar R y filtrar
          setLibros(response.data);
        } else {
          // Todos los libros sin filtrar
          setLibros(response.data);
        }
      }
      catch(e) {
        console.log('Error: ', e.response.data.Mensaje);
        setLibros([{id: 'Error', nombre: e.response.data.Mensaje}])
      }
    }
    connect();
  });
  
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
      <h2>
        <FontAwesomeIcon icon={faBook} />
        Libros
      </h2>
      <table border='1'>
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
