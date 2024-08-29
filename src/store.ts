import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
	cryptocurrencies: CryptoCurrency[];
	result: CryptoPrice;
	loading: boolean;
	fetchCryptos: () => Promise<void>;
	fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
	devtools((set) => ({
		cryptocurrencies: [],
		result: {} as CryptoPrice,
		loading: false,
		fetchCryptos: async () => {
			const cryptocurrencies = await getCryptos();

			set(() => ({
				cryptocurrencies,
			}));
		},
		fetchData: async (pair) => {
			const result = await fetchCurrentCryptoPrice(pair);
			set(() => ({
				loading: true,
			}));
			set(() => ({
				result,
				loading: false,
			}));
		},
	}))
);
