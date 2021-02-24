import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function LineaCategoria({ categoria }) {
  const eliminar = () => {  
    // TODO: agregar mensaje de confirmacion
    async function connect() {
      try {
        const response = await axios.delete('http://localhost:3001/categoria/' + categoria.categoria_id);
        console.log(response);
        // TODO: mostrar success!
        //actualis lista categoria

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
      <td>{categoria.categoria_id}</td>
      <td>{categoria.nombre}</td>
      <td>
        <a href={'/categorias/' + categoria.categoria_id}>
          <FontAwesomeIcon icon={faEye} />
        </a>
      </td>
      <td>
        <button onClick={eliminar}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  )
}
