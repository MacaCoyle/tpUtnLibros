import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

export default function FormularioLibro() {
  let match = useRouteMatch("/libros/editar/:libroId");
  if (match) { CargarLibro(match.params.libroId); }
  
  const [libro, setLibro] = useState({id: '', nombre: '', descripcion: ''});
  
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

  const handleChange = (event) => {  
    //this.setState({value: event.target.value});
  };
  
  const handleSubmit = (event) => {  
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
      <form onSubmit={handleSubmit()}>
        <input type="hidden" name="id" value={libro.id} onChange={handleChange()} />
        <label>
          Nombre:
          <input type="text" name="nombre" value={libro.nombre} onChange={handleChange()} />
        </label>
        <label>
          Descripcion:
          <input type="text" name="descripcion" value={libro.descripcion} onChange={handleChange()} />
        </label>
        <label>
          Categoria:
          <input type="text" name="categoria_id" value={libro.categoria_id} onChange={handleChange()} />
        </label>
        <input type="submit" value="Grabar"  onChange={handleChange()} />
      </form>
    </div>
  )
}
