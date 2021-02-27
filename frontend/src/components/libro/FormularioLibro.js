import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function FormularioLibro() {
  let match = useRouteMatch("/libros/editar/:libroId");
  if (match) {
    CargarLibro(match.params.libroId);
  }

  const [libro, setLibro] = useState({
    libro_id: "",
    persona_id: null,
    nombre: "",
    descripcion: "",
    categoria_id: "",
  });

  const [personaId, setPersonaId] = useState({
    persona_id: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [personas, setPersonas] = useState([]);

  function CargarLibro(libroId) {
    useEffect(() => {
      async function connect() {
        try {
          const response = await axios.get(
            "http://localhost:3001/libro/" + libroId
          );
          await setLibro(response.data[0]);
          setPersonaId({
            persona_id: libro.persona_id,
          });
        } catch (e) {
          console.log("Error: ", e.response.status);
          setLibro({ id: "Error", nombre: e.response.status });
        }
      }
      connect();
    }, [libroId]);
  }

  useEffect(() => {
    async function connect() {
      try {
        const response = await axios.get("http://localhost:3001/categoria");
        await setCategorias(response.data);
      } catch (e) {
        console.log("Error: ", e.response.status);
        setCategorias([{ id: "Error", nombre: e.response.status }]);
      }
    }
    connect();
  }, []);

  useEffect(() => {
    async function connect() {
      try {
        const response = await axios.get("http://localhost:3001/persona");
        await setPersonas(response.data);
      } catch (e) {
        console.log("Error: ", e.response.status);
        setPersonas([{ id: "Error", nombre: e.response.status }]);
      }
    }
    connect();
  }, []);

  const handleInputChange = (event) => {
    setLibro({
      ...libro,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    async function connect() {
      if (libro.libro_id) {
        try {
          const response = await axios.put(
            "http://localhost:3001/libro/" + libro.libro_id,
            libro
          );
          // TODO: mostrar success!
        } catch (e) {
          console.log("Error: ", e.response.status);
          // TODO: mostrar mensaje de error
        }
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3001/libro/",
            libro
          );
          // TODO: mostrar success!
        } catch (e) {
          console.log("Error: ", e.response.status);
          // TODO: mostrar mensaje de error
        }
      }
    }
    connect();
  };

  const handleInputPrestar = (event) => {
    setPersonaId({
      ...personaId,
      [event.target.name]: event.target.value,
    });
  };

  const handlePrestar = (event) => {
    event.preventDefault();

    async function connect() {
      try {
        const response = await axios.put(
          "http://localhost:3001/libro/prestar/" + libro.libro_id,
          personaId
        );
        // TODO: mostrar success!
      } catch (e) {
        console.log("Error: ", e.response.status);
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
      Formulario Libro
      <h3>{libro.libro_id ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="libro_id" value={libro.libro_id} />
        <label>
          Nombre:
          <input
            placeholder="Ingrese nombre"
            type="text"
            name="nombre"
            value={libro.nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descripcion:
          <input
            placeholder="Ingrese descripcion"
            type="text"
            name="descripcion"
            value={libro.descripcion}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <select
            name="categoria_id"
            id="categoria_id"
            onChange={handleInputChange}
          >
            {categorias.map((cat) => {
              if (libro.categoria_id === cat.categoria_id) {
                return (
                  <option
                    key={cat.categoria_id}
                    value={cat.categoria_id}
                    selected
                  >
                    {cat.nombre}
                  </option>
                );
              } else {
                return (
                  <option key={cat.categoria_id} value={cat.categoria_id}>
                    {cat.nombre}
                  </option>
                );
              }
            })}
          </select>
        </label>

        <button type="submit">Guardar</button>
      </form>
      <h2>Prestar</h2>
      <form onSubmit={handlePrestar}>
        <label>
          <select
            name="persona_id"
            id="persona_id"
            onChange={handleInputPrestar}
          >
            {personas.map((per) => {
              if (libro.persona_id === per.persona_id) {
                return (
                  <option key={per.persona_id} value={per.persona_id} selected>
                    {per.nombre} {per.apellido}
                  </option>
                );
              } else {
                return (
                  <option key={per.persona_id} value={per.persona_id}>
                    {per.nombre} {per.apellido}
                  </option>
                );
              }
            })}
          </select>
        </label>
        <button type="submit">Prestar</button>
      </form>
    </div>
  );
}
