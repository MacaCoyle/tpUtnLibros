import logo from './logo.svg';
import './App.css';

import ListadoLibros from './components/libro/ListadoLibros';
import UnLibro from './components/libro/UnLibro';
import FormularioLibro from './components/libro/FormularioLibro';

import ListadoPersonas from './components/persona/ListadoPersonas';
import UnaPersona from './components/persona/UnaPersona';
import FormularioPersona from './components/persona/FormularioPersona';

import ListadoCategorias from './components/categoria/ListadoCategorias';
import UnaCategoria from './components/categoria/UnaCategoria';
import FormularioCategoria from './components/categoria/FormularioCategoria';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src={logo} className="App-logo" alt="logo" />
          WHERE IS MY BOOK?
          <img src={logo} className="App-logo" alt="logo" />
        </h1>
      </header>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/libros">Libros</Link>
              </li>
              <li>
                <Link to="/personas">Personas</Link>
              </li>
              <li>
                <Link to="/categorias">Categorias</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            {/* LIBROS */}
            <Route path="/libros/agregar">
              <FormularioLibro />
            </Route>
            <Route path="/libros/editar/:categoriaId">
              <FormularioLibro />
            </Route>
            <Route path="/libros/:categoriaId">
              <UnLibro />
            </Route>
            <Route path="/libros">
              <ListadoLibros />
            </Route>
            {/* PERSONAS */}
            <Route path="/personas/agregar">
              <FormularioPersona />
            </Route>
            <Route path="/personas/editar/:categoriaId">
              <FormularioPersona />
            </Route>
            <Route path="/personas/:categoriaId">
              <UnaPersona />
            </Route>
            <Route path="/personas">
              <ListadoPersonas />
            </Route>
            {/* CATEGORIAS */}
            <Route path="/categorias/agregar">
              <FormularioCategoria />
            </Route>
            <Route path="/categorias/editar/:categoriaId">
              <FormularioCategoria />
            </Route>
            <Route path="/categorias/:categoriaId">
              <UnaCategoria />
            </Route>
            <Route path="/categorias">
              <ListadoCategorias />
            </Route>
            {/* ROOT */}
            <Route path="/">
              <ListadoLibros />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

// function Categorias() {
//   let match = useRouteMatch();

//   return (
//     <div>
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>

//       <ListadoCategorias />
//     </div>

//   );
// }

export default App;
