import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import TileItem from './components/tileitem';
import { useEffect, useState } from 'react';
import {db} from './services/firebaseConnection';
import {collection, onSnapshot, addDoc} from 'firebase/firestore';
import {toast, ToastContainer} from 'react-toastify';


function App() {

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [np_descricao, setDescricao] = useState('');
  const [np_vida, setVida] = useState('');

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

  function onExibirModal(){
    setIsOpen(true);
  }

  async function onAdicionarNPC(){
    
    let valido = true;
    if((np_descricao.trim === '') || (np_vida === '')){
      toast.error('Não pode criar, campos nulo');
      valido = false;
    }

    if(np_vida <= 0){
      toast.error('Não pode criar, vida tem que ser maior que zero');
      valido = false;
    }

    if(valido){
      await addDoc(collection(db, 'tb_npc'),{
        np_descricao: np_descricao.trim(),
        np_vida: np_vida,
      })
      .then( () =>{
        setIsOpen(false);
        setDescricao('');
        setVida('');
      })
      .catch((error)=>{
        console.log('Erro ao inserir; '+error);
        toast.error('Erro ao inserir');
      });
    }

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
      <Footer clicks={onExibirModal}/>

      {/* Tela Flutuante */}
      {isOpen && (
        <div className="overlay">
          <div className="modal">
            <h2>Criar novo NPC</h2>
            <hr/>
            <div className='div-edit'>
              <label>Nome:</label>
              <input value={np_descricao} onChange={((e)=> {setDescricao(e.target.value)})} placeholder='Nome NPC'/>
            </div>
            <div className='div-edit'>
              <label>Vida:</label>
              <input value={np_vida} type='number' onChange={((e)=> {setVida(e.target.value)})} placeholder='0'/>
            </div>
            <div className='div-bts'>
              <button onClick={(()=>{setIsOpen(false)})} className="close-btn">
                Cancelar
              </button>
              <button onClick={onAdicionarNPC} className="open-btn">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
