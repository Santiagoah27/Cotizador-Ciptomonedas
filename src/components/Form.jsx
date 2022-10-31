import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelectMonedas from "../hooks/useSelectMonedas"
import { Currencies } from "../data/currencies"

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`
const Form = ({setCurrencies}) => {

    const [ criptos, setCriptos ] = useState([])
    const [ error, setError ] = useState(false)

    const [ currency ,SelectCurrency ] = useSelectMonedas('Elige tu moneda', Currencies)
    const [ cripto ,SelectCripto ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect(() => {
        const consultAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const response = await fetch(url)
            const result = await response.json()

            const arrayCriptos = result.Data.map( cripto => {
                const obj = {
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }
                return obj
            })
            setCriptos(arrayCriptos)
        }
        consultAPI()
    },[])

    const handleSubmit = e => {
        e.preventDefault()
        if([currency, cripto].includes('')){
            setError(true)
            return;
        }
        setError(false)
        setCurrencies({
            currency,
            cripto
        })
    }

  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCripto />

        <InputSubmit
           type="submit"
           value="Cotizar" 
        />
    </form>
    </>
  )
}

export default Form