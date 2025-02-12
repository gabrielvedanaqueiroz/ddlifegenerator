import  './tileitem.css';
import { useState } from 'react';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';

function TileItem(props){
  
  const [id] = useState(props.id);
  const [vida, setVida] = useState(props.vida);

  async function onSalvar(aVida) {

    const docRef = doc(db, "tb_npc", id);
    await updateDoc(docRef, {
      np_vida: aVida,
    })
    .then(()=>{
      setVida(aVida);
    })
    .catch((error)=>{
      console.log('Erro ao editar: '+error);
    });
    
  }

  async function onInc(){
    let LVida = vida;
    LVida = ++LVida;
    
    setVida(LVida);
    //await onSalvar(LVida);
  }

  async function onDec(){
    let LVida = vida;
    LVida = --LVida;
    
    setVida(LVida);
    //await onSalvar(LVida);

  }

  async function onExcluir(){
    const docRef = doc(db, "tb_npc", id);
    await deleteDoc(docRef)
    .then(()=>{
    })
    .catch((error)=>{
      console.log('erro ao buscar '+error);
    });  
  };

  return(
    <div id={id} className='div-item'>
      TileItem {vida} <br/>
      <button onClick={onInc}>incrementar</button>
      <button onClick={onDec}>decrementar</button>
      <button onClick={onExcluir}>excluir</button>
    </div>
  );
}

export default TileItem;