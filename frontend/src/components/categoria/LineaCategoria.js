import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function LineaCategorias({ categoria }) {
  const eliminar = () => {  
    // TODO: agregar mensaje de confirmacion
    async function connect() {
      try {
        const response = await axios.delete('http://localhost:3001/categoria/' + categoria.id);
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
      <td>{categoria.id}</td>
      <td>{categoria.nombre}</td>
      <td>
        <a href={'/categorias/' + categoria.id}>
          <FontAwesomeIcon icon={faEye} />
        </a>
      </td>
      <td>
        <a href={'/categorias/editar/' + categoria.id}>
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
