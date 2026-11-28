export function GameStats({
	timeLeft,
	score,
	wordsCount,
	requiredLetter,
	status,
}) {
	const isUrgent = status === 'playing' && timeLeft <= 5;

	return (
		<section className="stats-grid">
			<div className={`stat-card ${isUrgent ? 'stat-urgent' : ''}`}>
				<span className="stat-label">Tiempo</span>
				<strong className="stat-value">{timeLeft}s</strong>
			</div>

			<div className="stat-card">
				<span className="stat-label">Puntaje</span>
				<strong className="stat-value">{score}</strong>
			</div>

			<div className="stat-card">
				<span className="stat-label">Palabras</span>
				<strong className="stat-value">{wordsCount}</strong>
			</div>

			<div className="stat-card">
				<span className="stat-label">Siguiente letra</span>
				<strong className="stat-value highlight">
					{requiredLetter || 'Cualquiera'}
				</strong>
			</div>
		</section>
	);
}