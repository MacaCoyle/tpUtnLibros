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
  const [persona, setPersona] = useState({id: ''});

  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/libro/' + libroId);
        setLibro(response.data);
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
        setCategoria(response.data);
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
          setPersona(response.data);
        }
        catch(e) {
          console.log('Error: ', e.response.status);
          setPersona({id: 'Error', nombre: e.response.status})
        }
      }
      connect();
    }
  },[libro]);

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
        ¿Esta prestado? {persona.id ? 'SI' : 'NO'}<br/>
        Persona: {persona.id && persona.nombre} {persona.id && persona.apellido} <br/>
        Alias: {persona.id && persona.alias} <br/>
        Email: {persona.id && persona.email} <br/>
        {persona.id && "BOTON DEVOLVER"}
      </p>
    </div>
  )
}
