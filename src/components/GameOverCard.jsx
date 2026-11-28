export function GameOverCard({ score, wordsCount, onRestart }) {
	return (
		<div className="gameover-card">
			<h2>¡Tiempo agotado! Partida finalizada</h2>
			<div className="gameover-summary">
				<p>
					Palabras encadenadas: <strong>{wordsCount}</strong>
				</p>
				<p>
					Puntaje final: <strong>{score} puntos</strong>
				</p>
			</div>
			<button type="button" className="btn-primary" onClick={onRestart}>
				Jugar de nuevo
			</button>
		</div>
	);
}