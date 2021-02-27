import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function LineaLibro({ libro, categoria, persona }) {
  const eliminar = () => {
    // TODO: agregar mensaje de confirmacion
    async function connect() {
      try {
        const response = await axios.delete(
          "http://localhost:3001/libro/" + libro.libro_id
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
    <tr>
      <td>{libro.libro_id}</td>
      <td>{libro.nombre}</td>
      <td>{libro.descripcion}</td>
      <td>
        {libro.categoria_id} {categoria && categoria.nombre}
      </td>
      {/*<td>{libro.categoria_id}</td>*/}
      <td>
        {libro.persona_id} {persona && persona.nombre}{" "}
        {persona && persona.apellido}
      </td>
      {/*<td>{libro.persona_id}</td>*/}
      <td>
        <a href={"/libros/" + libro.libro_id}>
          <FontAwesomeIcon icon={faEye} />
        </a>
      </td>
      <td>
        <a href={"/libros/editar/" + libro.libro_id}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </a>
      </td>
      <td>
        <button onClick={eliminar}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  );
}
