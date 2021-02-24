import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function LineaPersona({ persona }) {
  const eliminar = () => {  
    // TODO: agregar mensaje de confirmacion
    async function connect() {
      try {
        const response = await axios.delete('http://localhost:3001/persona/' + persona.persona_id);
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
      <td>{persona.persona_id}</td>
      <td>{persona.nombre}</td>
      <td>{persona.apellido}</td>
      <td>{persona.alias}</td>
      <td>{persona.email}</td>
      <td>
        <a href={'/personas/' + persona.persona_id}>
          <FontAwesomeIcon icon={faEye} />
        </a>
      </td>
      <td>
        <a href={'/personas/editar/' + persona.persona_id}>
          <FontAwesomeIcon icon={faPencilAlt} />
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
