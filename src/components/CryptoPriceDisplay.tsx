import { useMemo } from "react"
import { useCryptoStore } from "../store"
import './../index.css'
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {
    
    const dataCrypto = useCryptoStore((state)=>state.dataCrypto)
    const loading = useCryptoStore((state)=>state.loading)
    const hasResult = useMemo(() => !Object.values(dataCrypto).includes(''), [dataCrypto])

    return (
        <div className="result-wrapper">
            {loading ? <Spinner/> :hasResult && (
                <>
                    <h2>PRICE</h2>
                    <div className="result">
                        <img 
                            src={`https://cryptocompare.com/${dataCrypto.IMAGEURL}`} 
                            alt="Image cryptocurrency" 
                        />
                        <div>
                            <p>The price is: <span>{dataCrypto.PRICE}</span></p>
                            <p>The highest price of the day: <span>{dataCrypto.HIGHDAY}</span></p>
                            <p>The lowest price of the day: <span>{dataCrypto.LOWDAY}</span></p>
                            <p>variation last 24 hours: <span>{dataCrypto.CHANGEPCT24HOUR}</span></p>
                            <p>Last update: <span>{dataCrypto.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
