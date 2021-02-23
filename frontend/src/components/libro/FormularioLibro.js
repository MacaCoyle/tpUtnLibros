import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

export default function FormularioLibro() {
  let match = useRouteMatch("/libros/editar/:libroId");
  if (match) { CargarLibro(match.params.libroId); }
  
  const [libro, setLibro] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    categoria: ''
  });
  
  function CargarLibro(libroId) {
    useEffect(()=>{
      async function connect() {
        try {
          const response = await axios.get('http://localhost:3001/libro/' + libroId);
          setLibro(response.data);
        } catch(e) {
          console.log('Error: ', e.response.status);
          setLibro({id: 'Error', nombre: e.response.status})
        }
      }
      connect();
    },[libroId]);
  };
  

 const handleInputChange = (event) => { 
   console.log(event.target.value);
   setLibro({
     ...libro,
     [event.target.name] : event.target.value
   })

};


  
  const handleSubmit = (event) => {  
    event.preventDefault();
    console.log(libro);
    // async function connect() {
    //   try {
    //     const response = await axios.post('http://localhost:3001/categoria/');
    //     console.log(response);
    //     // TODO: mostrar success!
    //   }
    //   catch(e) {
    //     console.log('Error: ', e.response.status);
    //     // TODO: mostrar mensaje de error
    //   }
    // }
    // connect();
    
    //alert('A name was submitted: ' + event);
    //vent.preventDefault();
  };

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faBook} />
        Libros
      </h2>
      Formulario Libro 
      <h3>
        {(libro.id) ? 'Editar' : 'Agregar'}
      </h3>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={libro.id}/>
        <label>
          Nombre:
          <input
            placeholder="Ingrese nombre"
            type="text"
            name="nombre"
            value={libro.nombre}
            onChange={handleInputChange} />
        </label>
        <label>
          Descripcion:
          <input
            placeholder="Ingrese descripcion"
            type="text"
            name="descripcion"
            value={libro.descripcion}
            onChange={handleInputChange} />
        </label>
        <label>
          Categoria:
          <input
            placeholder="Ingrese categoria"
            type="text"
            name="categoria"
            value={libro.categoria}
            onChange={handleInputChange} />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}
