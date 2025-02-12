import './footer.css';
import add from '../../res/adicionar.svg';

function Footer(){

  function onFabClick(){
    alert('criar tela');
  }

  return(
    <footer className='ft_bottom-bar'>   
      <button className='fab' onClick={onFabClick}><img src={add} alt='adicionar'/></button>
    </footer>
  );
}

export default Footer;