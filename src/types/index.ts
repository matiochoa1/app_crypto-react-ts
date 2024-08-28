import { z } from "zod";
import {
	CurrencySchema,
	CryptoCurrencyResponseSchema,
	PairSchema,
} from "../schemas/crypto-schema";

export type Currency = z.infer<typeof CurrencySchema>;
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>;
export type Pair = z.infer<typeof PairSchema>;
