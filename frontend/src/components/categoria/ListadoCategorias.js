import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faPlus } from '@fortawesome/free-solid-svg-icons'

import LineaCategoria from './LineaCategoria'

export default function ListadoCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasHtml, setCategoriasHtml] = useState([]);

  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/categoria');
        setCategorias(response.data);
      }
      catch(e) {
        console.log('Error: ', e.response.status);
        setCategorias([{id: 'Error', nombre: e.response.status}])
      }
    }
    connect();
  },[]);
  
  useEffect(()=>{
    const tbody = categorias.map(categoria =>(
      <LineaCategoria categoria={categoria} key={categoria.id} />
    ));
    setCategoriasHtml(tbody);
  },[categorias]);

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faTags} />
        Categorias
      </h2>
      <a href='/categorias/agregar'>
        <FontAwesomeIcon icon={faPlus} /> Agregar
      </a>
      <table border='1'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categoriasHtml}
        </tbody>
      </table>
    </div>
  )
}
