import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

export default function UnLibro() {
  let match = useRouteMatch("/libros/:libroId");
  let libroId = match.params.libroId;
  
  const [libro, setLibro] = useState({});
  const [categoria, setCategoria] = useState({});
  const [persona, setPersona] = useState({persona_id: ''});

  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/libro/' + libroId);
        setLibro(response.data[0]);
        console.log(response.data[0]);
      }
      catch(e) {
        console.log('Error: ', e.response.status);
        setLibro({id: 'Error', nombre: e.response.status})
      }
    }
    connect();
  },[libroId]);

  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/categoria/' + libro.categoria_id);
        setCategoria(response.data[0]);
        console.log(response.data[0]);
      }
      catch(e) {
        console.log('Error: ', e.response.status);
        setCategoria({id: 'Error', nombre: e.response.status})
      }
    }
    connect();
  },[libro]);

  useEffect(()=>{
    if (libro.persona_id) {
      async function connect() {
        try {
          const response = await axios.get('http://localhost:3001/persona/' + libro.persona_id);
          setPersona(response.data[0]);
          console.log(response.data[0]);
        }
        catch(e) {
          console.log('Error: ', e.response.status);
          setPersona({id: 'Error', nombre: e.response.status})
        }
      }
      connect();
    }
  },[libro]);

  const handleDevolver = () => {
    //console.log("devolcido");

    async function connect() {
      try {
        const response = await axios.put('http://localhost:3001/libro/devolver/' + libro.libro_id);
        console.log(response);
        // TODO: mostrar success!
      }
      catch(e) {
        console.log('Error: ', e.response.status);
        // TODO: mostrar mensaje de error
      }
    }
    connect();

  };

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faBook} />
        Libros
      </h2>
      <h3>
        <FontAwesomeIcon icon={faBook} />
        {libro.nombre}
      </h3>
      <p>
        {libro.descripcion}
      </p>
      <p>
        Categoria: {categoria && categoria.nombre}
      </p>
      <p>
        ¿Esta prestado? {persona.persona_id ? 'SI' : 'NO'}<br/>

        Persona: {persona.persona_id && persona.nombre} {persona.persona_id && persona.apellido} <br/>
        Alias: {persona.persona_id && persona.alias} <br/>
        Email: {persona.persona_id && persona.email} <br/>
        {persona.persona_id && <button onClick={handleDevolver}>Devolver</button>}
      </p>
      
    </div>
  )
}
