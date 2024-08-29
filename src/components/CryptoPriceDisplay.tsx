import { useMemo } from "react";
import { useCryptoStore } from "../store";
import { Spinner } from "./Spinner";

export const CryptoPriceDisplay = () => {
	const result = useCryptoStore((state) => state.result);

	const loading = useCryptoStore((state) => state.loading);

	const hasResult = useMemo(() => Object.keys(result).length > 0, [result]);

	return (
		<>
			<div className="result-wrapper">
				{loading ? (
					<Spinner />
				) : (
					hasResult && (
						<>
							<h2>Cotizacion</h2>

							<div className="result">
								<img
									src={`https://www.cryptocompare.com/${result.IMAGEURL}`}
									alt="Imagen de la criptomoneda"
								/>
								<div>
									<p>
										El precio es de: <span>{result.PRICE}</span>
									</p>
									<p>
										Precio mas alto del dia: <span>{result.HIGHDAY}</span>
									</p>
									<p>
										Precio mas bajo del dia: <span>{result.LOWDAY}</span>
									</p>
									<p>
										Variacion ultimas 24 horas:{" "}
										<span>{result.CHANGEPCT24HOUR}</span>
									</p>
									<p>
										Ultima actualización:
										<span>{result.LASTUPDATE}</span>
									</p>
								</div>
							</div>
						</>
					)
				)}
			</div>
		</>
	);
};
