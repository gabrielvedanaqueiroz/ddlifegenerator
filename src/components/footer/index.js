import './footer.css';
import add from '../../res/adicionar.svg';

function Footer(props){

  return(
    <footer className='ft_bottom-bar'>   
      <button className='fab' onClick={(()=>{props.clicks()})}><img src={add} alt='adicionar'/></button>
    </footer>
  );
}

export default Footer;