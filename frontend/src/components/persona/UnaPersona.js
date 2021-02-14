import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

import ListadoLibros from '../libro/ListadoLibros';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'

export default function UnaPersona() {
  let match = useRouteMatch("/personas/:personaId");
  let personaId = match.params.personaId;
  
  const [persona, setPersona] = useState({});
  
  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/persona/' + personaId);
        setPersona(response.data);
      }
      catch(e) {
        console.log('Error: ', e.response.status);
        setPersona({id: 'Error', nombre: e.response.status})
      }
    }
    connect();
  },[personaId]);

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faUserFriends} />
        Personas
      </h2>
      <h3>
        <FontAwesomeIcon icon={faUser} />
        {persona.nombre} {persona.apellido} ({persona.alias})
      </h3>
      <p>
        {persona.email}
      </p>
      Libros prestados a esta persona:
      <ListadoLibros persona={personaId} />
    </div>
  )
}
