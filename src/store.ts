import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency } from "./types";
import { getCryptos } from "./services/CryptoService";

type CryptoStore = {
	cryptocurrencies: CryptoCurrency[];
	fetchCryptos: () => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
	devtools((set) => ({
		cryptocurrencies: [],
		fetchCryptos: async () => {
			const cryptocurrencies = await getCryptos();

			set(() => ({
				cryptocurrencies,
			}));
		},
	}))
);
