import { useState, FormEvent } from "react"
import './App.css'

import logoImg from './assets/logo.png'

interface ResultProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App(){
  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [result, setResult] = useState<ResultProps>()

  function calcular(event: FormEvent){
    event.preventDefault();

    let calculo = (alcoolInput / gasolinaInput)

    if(calculo <= 0.7){
      setResult({
        title: "Compensa utilizar Álcool!",
        gasolina: formatarMoeda (gasolinaInput),
        alcool: formatarMoeda (alcoolInput)
      })
    }else{
      setResult({
        title: "Compensa utilizar Gasolina!",
        gasolina: formatarMoeda (gasolinaInput),
        alcool: formatarMoeda (alcoolInput)
      })
    }
  }
  

      function formatarMoeda(valor: number){
        let valorFormatado = valor.toLocaleString("pt-br",
        {
            style: "currency",
            currency: "BRL"
        })

        return valorFormatado

      }


  return(
    <div>
      <main className="max-w-screen-md	flex  flex-col justify-center items-center p-0 pl-3.5">
        <img className="max-w-56	"
          src={logoImg}
          alt="Logo da calculadora de gasolina ou alcool"
        />

      <h1 className="text-white	items-center my-6 mx-0 font-bold text-xl">Qual melhor opção?</h1>

        <form className=" text-xl" onSubmit={calcular}>
          <label className="text-white text-xl">Álcool (preço por litro):</label>
          <input 
          className="w-full h-12 border-0 rounded text-xl py-0 px-3.5 mb-4 mt-2"
          type="number"
          placeholder="4.90"
          min="1"
          step="0.01"
          required
          value={alcoolInput}
          onChange={ (e) => setAlcoolInput(Number(e.target.value))}
          />


          <label className="text-white text-xl ">Gasolina (preço por litro):</label>
          <input 
          className="w-full h-12 border-0 rounded text-xl py-0 px-3.5 mb-4 mt-2"
          type="number"
          placeholder="4.90"
          min="1"
          step="0.01"
          required
          value={gasolinaInput}
          onChange={ (e) => setGasolinaInput(Number(e.target.value))}
          />

        <input className="w-full h-12 bg-blue-500 border-0 rounded text-white text-xl font-bold" type="submit" value="Calcular" />

        </form>

       {result && Object.keys(result).length > 0 &&(
           <section className=" bg-green-600 w-full rounded text-center flex-col flex max-w-md py-5 px-7 my-6 mx-0 ho hover:bg-green-700">
           <h2 className="font-bold text-2xl text-white mb-4">{result.title}</h2>
 
           <span className="text-white mb-4 text-lg">Álcool {result.alcool}</span>
           <span className="text-white mb-4 text-lg">Gasolina {result.gasolina}</span>
 
         </section>
       )}

      </main>
    </div>
  )
}

export default App