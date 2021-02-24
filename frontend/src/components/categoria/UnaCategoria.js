import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

import ListadoLibros from '../libro/ListadoLibros';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faTags } from '@fortawesome/free-solid-svg-icons'

export default function UnaCategoria() {
  let match = useRouteMatch("/categorias/:categoriaId");
  let categoriaId = match.params.categoriaId;
  
  const [categoria, setCategoria] = useState({});
  
  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/categoria/' + categoriaId);
        setCategoria(response.data[0]);
      }
      catch(e) {
        console.log('Error: ', e.response.status);
        setCategoria({id: 'Error', nombre: e.response.status})
      }
    }
    connect();
  });

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faTags} />
        Categorias
      </h2>
      <h3>
        <FontAwesomeIcon icon={faTag} />
        {categoria.nombre}
      </h3>
      <pre>
        id: {categoria.categoria_id} <br/>
        nombre: {categoria.nombre}
      </pre>
      Libros de esta categoria:
      <ListadoLibros categoria={categoriaId} />
    </div>
  )
}
