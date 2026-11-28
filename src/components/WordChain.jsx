export function WordChain({ words }) {
	if (words.length === 0) {
		return (
			<p className="empty-chain">
				Todavía no ingresaste palabras. El reloj de 15 segundos
				arrancará con la primera palabra válida.
			</p>
		);
	}

	return (
		<div className="chain-container">
			{words.map((word, index) => (
				<div key={`${word}-${index}`} className="word-chip">
					<span>{word}</span>
					<small>+{word.length}</small>
				</div>
			))}
		</div>
	);
}