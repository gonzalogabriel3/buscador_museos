/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import Museos from "./components/Museos.jsx"


function App () {

  return (
    <>
      {/*Acomodar con Flex*/}
      <div style={{display:"flex",flexDirection:"row"}}>
        <img  width={60} src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Coat_of_arms_of_Argentina.svg' />
        <h4 >&nbsp;Buscador de Museos Nacionales de la Republica Argentina</h4>
      </div>
      <Museos></Museos>
    </>
  );
}

export default App;
