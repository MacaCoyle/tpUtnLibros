import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function LineaLibro({ libro, categoria, persona }) {
  const eliminar = () => {  
    // TODO: agregar mensaje de confirmacion
    async function connect() {
      try {
        const response = await axios.delete('http://localhost:3001/libro/' + libro.id);
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
    <tr>
      <td>{libro.id}</td>
      <td>{libro.nombre}</td>
      <td>{libro.descripcion}</td>
      <td>{categoria && categoria.nombre}</td>
      <td>{persona && persona.nombre} {persona && persona.apellido}</td>
      <td>
        <a href={'/libros/' + libro.id}>
          <FontAwesomeIcon icon={faEye} />
        </a>
      </td>
      <td>
        <a href={'/libros/editar/' + libro.id}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </a>
      </td>
      <td>
        <button onClick={() => eliminar()}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  )
}
