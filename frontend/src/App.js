import logo from './logo.svg';
import './App.css';

import ListadoCategorias from './components/categoria/ListadoCategorias';
import ListadoLibros from './components/libro/ListadoLibros';
import ListadoPersonas from './components/persona/ListadoPersonas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src={logo} className="App-logo" alt="logo" />
          WHERE IS MY BOOK?
          <img src={logo} className="App-logo" alt="logo" />
        </h1>
        <ListadoCategorias />
        <ListadoLibros />
        <ListadoPersonas />
      </header>
    </div>
  );
}

export default App;
