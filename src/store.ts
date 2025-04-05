import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Cryptocurrency, DataCrypto, Pair } from "./types"
import { getCryptos, getResponse } from "./services/CryptoService"

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    dataCrypto: DataCrypto
    loading: boolean
    fetchCryptos: () => Promise<void>
    getDataCryptos: (pair: Pair )=> Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(
    devtools((set)=>(
        {   
            cryptocurrencies: [],
            dataCrypto:{} as DataCrypto,
            loading:false,
            fetchCryptos: async()=>{
                const cryptocurrencies = await getCryptos()
                set(()=>({
                    cryptocurrencies
                }))
            },
            getDataCryptos: async(pair)=>{
                set(()=>({
                    loading:true
                }))
                const dataCrypto = await getResponse(pair)
                set(()=>({
                    dataCrypto,
                    loading:false
                }))
            }
        }
    )))
