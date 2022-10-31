import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Form from "./components/Form"
import Result from "./components/Result"
import CriptoImage from './img/imagen-criptos.png'
import Spinner from "./components/Spinner"

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
   font-family: 'lato', sans-serif;
   color: #FFF;
   text-align: center;
   font-weight: 700;
   margin-top: 80px;
   margin-bottom: 50px;
   font-size: 34px;

   &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #69a4fb;
    display: block;
    margin: 10px auto 0 auto;
   }
`
function App() {

  const [ currencies, setCurrencies] = useState({})
  const [ trade , setTrade ] = useState({})
  const [ loading , setLoading ] = useState(false)

  useEffect( () => {
    if(Object.keys(currencies).length > 0){
      const tradeCritpo = async () => {
        setLoading(true)

        const { currency, cripto } = currencies
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${currency}`
        const response = await fetch(url)
        const result = await response.json()
        setTrade(result.DISPLAY[cripto][currency])

        setLoading(false)
      }
      tradeCritpo()
    }
  }, [currencies]) 

  return (
    <Container>
      <Image
         src={CriptoImage}
         alt="imagenes criptomonedas"
      />
      <div>
         <Heading>Cotiza criptomonedas al instante</Heading>
         <Form 
            setCurrencies={setCurrencies}
         />
         {loading && <Spinner/>}
            {trade.PRICE && <Result trade={trade}/>}
      </div>
    </Container>
  )
}

export default App
