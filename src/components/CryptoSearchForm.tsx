import { useState, ChangeEvent, FormEvent } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import { Error } from "./Error";

export const CryptoSearchForm = () => {
	const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
	const fetchData = useCryptoStore((state) => state.fetchData);

	const [pair, setPair] = useState<Pair>({
		currency: "",
		cryptocurrency: "",
	});

	const [error, setError] = useState("");

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setPair({ ...pair, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (Object.values(pair).includes("")) {
			setError("Todos los campos son obligatorios");
			return;
		}

		setError("");
		fetchData(pair);
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			{error && <Error>{error}</Error>}
			<div className="field">
				<label htmlFor="currency">Moneda:</label>
				<select
					name="currency"
					id="currency"
					onChange={handleChange}
					value={pair.currency}>
					<option value="">-- Seleccione --</option>
					{currencies.map((currency) => (
						<option key={currency.code} value={currency.code}>
							{currency.name}
						</option>
					))}
				</select>
			</div>

			<div className="field">
				<label htmlFor="cryptocurrency">Moneda:</label>
				<select
					name="cryptocurrency"
					id="cryptocurrency"
					onChange={handleChange}
					value={pair.cryptocurrency}>
					<option value="">-- Seleccione --</option>
					{cryptocurrencies.map((currency) => (
						<option
							key={currency.CoinInfo.Internal}
							value={currency.CoinInfo.Internal}>
							{currency.CoinInfo.FullName}
						</option>
					))}
				</select>
			</div>

			<input type="submit" value="Cotizar" />
		</form>
	);
};
