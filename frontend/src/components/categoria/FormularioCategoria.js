import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

export default function FormularioCategoria() {
  let match = useRouteMatch("/categorias/editar/:categoriaId");
  if (match) { CargarCategoria(match.params.categoriaId); }

  const [categoria, setCategoria] = useState({ id: '', nombre: '' });

  function CargarCategoria(categoriaId) {
    useEffect(() => {
      async function connect() {
        try {
          const response = await axios.get('http://localhost:3001/categoria/' + categoriaId);
          setCategoria(response.data);
        } catch (e) {
          console.log('Error: ', e.response.status);
          setCategoria({ id: 'Error', nombre: e.response.status })
        }
      }
      connect();
    }, [categoriaId]);
  };

  const handleChange = (event) => {
    setCategoria({ nombre: event.target.value });
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:3001/categoria', { nombre: categoria.nombre })
      .then(console.log("Envie todo vamos"))
      .catch(console.log("fallo todo"))


    alert('A name was submitted: ' + categoria.nombre);
  }

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faTags} />
        Categorias
      </h2>
      Formulario Categoria
      <h3>
        {(categoria.id) ? 'Editar' : 'Agregar'}
      </h3>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={categoria.id} />
        <label>
          Nombre:
          <input type="text" name="nombre" value={categoria.nombre} onChange={handleChange} />
        </label>
        <input type="submit" value="Grabar" />
      </form>
    </div>
  )
}
