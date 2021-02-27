import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

export default function FormularioCategoria() {
  let match = useRouteMatch("/categorias/editar/:categoriaId");
  if (match) {
    CargarCategoria(match.params.categoriaId);
  }

  const [categoria, setCategoria] = useState({ categoria_id: "", nombre: "" });

  function CargarCategoria(categoriaId) {
    useEffect(() => {
      async function connect() {
        try {
          const response = await axios.get(
            "http://localhost:3001/categoria/" + categoriaId
          );
          setCategoria(response.data[0]);
        } catch (e) {
          console.log("Error: ", e.response.status);
          setCategoria({ id: "Error", nombre: e.response.status });
        }
      }
      connect();
    }, [categoriaId]);
  }

  const handleInputChange = (event) => {
    setCategoria({
      ...categoria,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    async function connect() {
      try {
        const response = await axios.post(
          "http://localhost:3001/categoria/",
          categoria
        );
        // TODO: mostrar success!
      } catch (e) {
        console.log("Error: ", e.response.status);
        // TODO: mostrar mensaje de error
      }
    }
    connect();

    //alert('A name was submitted: ' + event);
    //vent.preventDefault();
  };

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faTags} />
        Categorias
      </h2>
      Formulario Categoria
      <h3>{categoria.categoria_id ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="categoria_id"
          value={categoria.categoria_id}
        />
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={categoria.nombre}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Grabar" />
      </form>
    </div>
  );
}
