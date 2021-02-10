import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <tr>
        <td>{categoria.id}</td>
        <td>{categoria.nombre}</td>
      </tr>
    ));
    setCategoriasHtml(tbody);
  },[categorias]);

  return (
    <div>
      <h2>Categorias</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {categoriasHtml}
        </tbody>
      </table>
    </div>
  )
}
