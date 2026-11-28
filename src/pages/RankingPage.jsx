import { getTopScores } from '../utils/leaderboardStorage';

export function RankingPage() {
	const scores = getTopScores();

	return (
		<main className="page-container">
			<h2>Top 10 Mejores Puntajes</h2>

			{scores.length === 0 ? (
				<p className="empty-chain">Aún no hay partidas registradas.</p>
			) : (
				<table className="ranking-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Puntaje</th>
							<th>Palabras</th>
							<th>Fecha</th>
						</tr>
					</thead>
					<tbody>
						{scores.map((item, idx) => (
							<tr key={item.id}>
								<td>{idx + 1}</td>
								<td>
									<strong>{item.score} pts</strong>
								</td>
								<td>{item.wordsCount}</td>
								<td>{item.date}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</main>
	);
}