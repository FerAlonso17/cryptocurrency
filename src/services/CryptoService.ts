import axios from "axios"
import { CryptoCurrenciesResponseSchema, DataCryptoSchema } from "../schema/crypto-schema"
import { Pair } from "../types"

export async function getCryptos(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    if (result.success) {
        return result.data
    }
}

export async function getResponse(pair:Pair) {
    const currency = pair.currency
    const cryptocurrency = pair.cryptocurrency
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`
    const {data:{DISPLAY}} = await axios(url)
    const result = DataCryptoSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency])
    //Para obtener data de una api con nombres de objetos que son variables
    if (result.success) {
        return result.data
    }
}