import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import TileItem from './components/tileitem';
import { useEffect, useState } from 'react';
import {db} from './services/firebaseConnection';
import {collection, onSnapshot} from 'firebase/firestore';
import {toast, ToastContainer} from 'react-toastify';


function App() {

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function buscar() {
      try{

        onSnapshot(collection(db, "tb_npc"), (snapshot)=>{
          let listaAux = [];

          snapshot.forEach((doc)=>{
            listaAux.push({
              np_id: doc.id.trim(),
              np_descricao: doc.data().np_descricao.trim(),
              np_vida: doc.data().np_vida,
            });
          });
  
          listaAux.sort((a, b)=> a.np_descricao.trim() > b.np_descricao.trim());
          setLista(listaAux);
          setLoading(false);
        });
      }
      catch(error){
        console.error('Erro ao buscar npcs: '+ error);
        toast.error('Erro ao buscar npcs')
      }
      finally {
        setLoading(false);
      }
    } 

    buscar();
  },[]);

  if(loading){
    return(
      <div className='loading'> 
        <h2>carregando...</h2>
      </div>
    )
  }

  return (
    <div className="App">
      <Header/>
      <ul>
      {
        lista.map((item)=>{
          return(
            <TileItem id={item.np_id} vida={item.np_vida} descricao={item.np_descricao}/>   
          );
        })
      }
      </ul>
      
      <ToastContainer/>
      <Footer/>
    </div>
  );
}

export default App;
