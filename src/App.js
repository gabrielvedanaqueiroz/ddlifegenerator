import logo from './logo.svg';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import TileItem from './components/tileitem';

function App() {

  return (
    <div className="App">
      <Header/>

      <TileItem id='id-xpto' vida='99'/>
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Footer/>
    </div>
  );
}

export default App;
