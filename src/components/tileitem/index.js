import  './tileitem.css';
import { useState } from 'react';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';
import img_npc from '../../res/npc.png';
import img_vida from '../../res/vida.png';
import img_inc from '../../res/inc.svg';
import img_dec from '../../res/dec.svg';
import img_delete from '../../res/delete.svg';

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
        
    await onSalvar(LVida);
  }

  async function onDec(){
    let LVida = vida;
    LVida = --LVida;
    
    await onSalvar(LVida);

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
    <li key={id} className='item_container'>
      <img className='item_logo' src={img_npc} alt='npc'/>
      <div className='item_conteudo'>
        <div className='item_label-descricao'>{props.descricao}</div>
        <div className='item_segunda-linha'>
          <div className='item_div-vida'>
            <img className='item-img-vida' src={img_vida} alt ='vida'/>
            <div className='item_label-vida'>{vida}</div>
          </div>          
          <div className='item_div-botoes'>
            <button className='item_botao-delete' onClick={onExcluir}><img className='item-img' src={img_delete} alt='excluir'/></button>
            <button className='item_botao' onClick={onDec}><img className='item-img' src={img_dec} alt='decrementar'/></button>
            <button className='item_botao' onClick={onInc}><img className='item-img' src={img_inc} alt='incrementar'/></button>            
          </div>
        </div>
      </div>
    </li>
  );
}

export default TileItem;