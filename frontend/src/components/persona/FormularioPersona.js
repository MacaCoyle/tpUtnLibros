import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

export default function FormularioPersona() {
  let match = useRouteMatch("/personas/editar/:personaId");
  if (match) { CargarPersona(match.params.personaId); }
  
  const [persona, setPersona] = useState({id: '', nombre: '', apellido: '', alias: '', email: ''});
  
  function CargarPersona(personaId) {
    useEffect(()=>{
      async function connect() {
        try {
          const response = await axios.get('http://localhost:3001/persona/' + personaId);
          setPersona(response.data);
        } catch(e) {
          console.log('Error: ', e.response.status);
          setPersona({id: 'Error', nombre: e.response.status})
        }
      }
      connect();
    },[personaId]);
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
        <FontAwesomeIcon icon={faUserFriends} />
        Personas
      </h2>
      Formulario Persona 
      <h3>
        {(persona.id) ? 'Editar' : 'Agregar'}
      </h3>
      <form onSubmit={handleSubmit()}>
        <input type="hidden" name="id" value={persona.id} onChange={handleChange()} />
        <label>
          Nombre:
          <input type="text" name="nombre" value={persona.nombre} onChange={handleChange()} />
        </label>
        <label>
          Apellido:
          <input type="text" name="apellido" value={persona.apellido} onChange={handleChange()} />
        </label>
        <label>
          Alias:
          <input type="text" name="alias" value={persona.alias} onChange={handleChange()} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={persona.email} onChange={handleChange()} />
        </label>
        <input type="submit" value="Grabar"  onChange={handleChange()} />
      </form>
    </div>
  )
}
