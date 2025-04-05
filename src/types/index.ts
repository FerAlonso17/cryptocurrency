import { z } from "zod";
import { CryptoCurrencyResponseSchema, CurrencySchema, DataCryptoSchema, PairSchema } from "../schema/crypto-schema";

export type Currency = z.infer<typeof CurrencySchema>
export type Cryptocurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type Pair = z.infer<typeof PairSchema>
export type DataCrypto = z.infer<typeof DataCryptoSchema>