import { useState } from "react";
import { currencies } from "../data/currencies";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

export default function CryptoSearchForm() {

    const [pair,setPair] = useState<Pair>({
        currency:'',
        cryptocurrency:''
    })
    const [error,setError] = useState('')

    const cryptocurrencies = useCryptoStore((state)=> state.cryptocurrencies)
    const getDataCryptos = useCryptoStore((state)=> state.getDataCryptos)

    const handleChange =(e: React.ChangeEvent<HTMLSelectElement>)=>{
        setPair({
            ...pair,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (Object.values(pair).includes('')) {
            setError('All fields are required')
            return
        }
        setError('')

        //Consultar la api
        getDataCryptos(pair)
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='field'>
                <label htmlFor="currency">Currency:</label>
                <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
                    <option value="">--Select--</option>
                    {currencies.map(currency=>(
                        <option
                            key={currency.code}
                            value={currency.code}
                        >
                            {currency.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='field'>
                <label htmlFor="cryptocurrency">Cryptocurrency:</label>
                <select name="cryptocurrency" id="cryptocurrency" onChange={handleChange} value={pair.cryptocurrency}>
                    <option value="">--Select--</option>
                    {cryptocurrencies.map(cryptocurrency=>(
                        <option
                            key={cryptocurrency.CoinInfo.Name}
                            value={cryptocurrency.CoinInfo.Name}
                        >
                            {cryptocurrency.CoinInfo.FullName}
                        </option>
                    ))}
                </select>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>} 
            <input type="submit" value='QUOTE'/>
        </form>
    )
}
