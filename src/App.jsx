import './App.css';
import { useState } from 'react';
import axios from 'axios'

function App() {

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({});
  const [mostrar, setMostrar] = useState(false)

  const pushCep = () => {
    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
        setAddress(res.data)
        setMostrar(true)
        console.log(res.data)
      })
    } else {
      if (cep.length < 8) {
        alert("Cep incompleto!")
      }
      else {
        alert("Cep invalido!")
      }
    }
  }

  function maskCep(value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  }




  return (
    <div className="App">
      <main>
        <section className='secao'>
          <div className='Inputs'>
            <h1>Verificador de CEP</h1>
            <h2>Insira o seu CEP abaixo: </h2>
            <div className="input_wrapper">
              <input type="text" id="input-cep" value={maskCep(cep)} onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setCep(onlyNumbers)
              }} maxLength={9} />
              <p><button onClick={pushCep}>Pesquisar</button></p>
            </div>
            {cep.length > 0 &&
              (cep.length === 8 ? <p style={{
                color: "#afa",
                textShadow: "1px 0px rgba(0, 0, 0, 0.479)",
                marginLeft: "3rem",
                marginTop: "0.5rem",
                fontStyle: "italic",
                fontfamily: '"Roboto Slab", serif'
              }}>📍 Endereço encontrado!</p> : <p style={{
                color: "#faa",
                textShadow: "1px 0px rgba(0, 0, 0, 0.479)",
                marginLeft: "3rem",
                marginTop: "0.5rem",
                fontStyle: "italic",
                fontfamily: '"Roboto Slab", serif'
              }}>📍 Endereço não encontrado!</p>)}
          </div>
          {mostrar && <div className='Info'>
            <p><strong>CEP:</strong> {address.cep}</p>
            <p><strong>Logradouro:</strong> {address.logradouro || "Não informado"}</p>
            <p><strong>Bairro:</strong> {address.bairro || "Não informado"}</p>
            <p><strong>Cidade:</strong> {address.localidade}</p>
            <p><strong>Estado:</strong> {address.uf}</p>
            <p><strong>DDD:</strong> {address.ddd}</p>
          </div>}
        </section>
      </main>
    </div>
  );
}

export default App;
