import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBook } from '@fortawesome/free-solid-svg-icons'

import LineaLibro from './LineaLibro'

export default function ListadoLibros({ categoria, persona }) {
  const [libros, setLibros] = useState([]);
  const [librosHtml, setLibrosHtml] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [personas, setPersonas] = useState([]);

  useEffect(()=>{
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/libro');
        if (categoria) {
          // Libros filtrados por categoria
          setLibros(response.data.filter(libro => libro.categoria_id.toString() === categoria));
        } else if (persona) {
          // Libros filtrados por persona
          setLibros(response.data.filter(libro => (libro.persona_id && libro.persona_id.toString() === persona)));
        } else {
          // Todos los libros sin filtrar
          setLibros(response.data);
        }
      } catch(e) {
        console.log('Error: ', e.response.data.Mensaje);
        setLibros([{id: 'Error', nombre: e.response.data.Mensaje}])
      }
    }
    connect();
  },[categoria, persona]);

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
    async function connect() {
      try {
        const response = await axios.get('http://localhost:3001/persona');
        setPersonas(response.data);
      }
      catch(e) {
        console.log('Error: ', e.response.status);
        setPersonas([{id: 'Error', nombre: e.response.status}])
      }
    }
    connect();
  },[]);

  useEffect(()=>{
    const tbody = libros.map(libro =>(
      <LineaLibro libro={libro} key={libro.id} 
                  categoria={categorias.find(categoria => categoria.id === libro.categoria_id)} 
                  persona={personas.find(persona => (libro.persona_id && persona.id === libro.persona_id))} />
    ));
    setLibrosHtml(tbody);
  },[libros, categorias, personas]);

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faBook} />
        Libros
      </h2>
      <a href='/libros/agregar'>
        <FontAwesomeIcon icon={faPlus} /> Agregar
      </a>
      <table border='1'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoria</th>
            <th>Prestado</th>
          </tr>
        </thead>
        <tbody>
          {librosHtml}
        </tbody>
      </table>
    </div>
  )
}
