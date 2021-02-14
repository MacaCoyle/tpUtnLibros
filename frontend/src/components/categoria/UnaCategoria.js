import ListadoLibros from '../libro/ListadoLibros';

import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'

export default function UnaCategoria({ categoria }) {
  let match = useRouteMatch("/categorias/:categoriaId");
  let categoriaId = match.params.categoriaId;
  console.log(categoriaId);

  // TODO: get categoria ID = match.params.categoriaId
  // categoria = axios...

  return (
    <div>
      Una categoria
      <FontAwesomeIcon icon={faTag} />
      <b>{categoria}</b>
      {/* <b>{categoria.nombre}</b> */}
      <pre>
        {/* id: {categoria.id} */}
        {/* nombre: {categoria.nombre} */}
      </pre>
      {/* <ListadoLibros categoria={categoriaId} /> */}
    </div>
  )
}
