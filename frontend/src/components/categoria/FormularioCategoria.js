import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons'

export default function FormularioCategoria({ categoria }) {
  // Si viene una categoria, completar el formulario y usar el boton "actualizar"
  // Si no hay una categoria, usar el formulario en blanco y el boton "agregar"
  return (
    <div>
      TODO: Formulario Categoria 
      <FontAwesomeIcon icon={faPlus} />
      <FontAwesomeIcon icon={faSave} />
    </div>
  )
}
