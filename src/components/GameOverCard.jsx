import { useState } from 'react';
import { toast } from 'react-toastify';
import {
	getSessionPlayer,
	setSessionPlayer,
	saveGameScore,
} from '../utils/leaderboardStorage';

export function GameOverCard({ score, wordsCount, onRestart }) {
	const sessionPlayer = getSessionPlayer();
	const [isEditingName, setIsEditingName] = useState(!sessionPlayer);
	const [playerName, setPlayerName] = useState(sessionPlayer);
	const [savedPlayer, setSavedPlayer] = useState('');

	const handleConfirmSave = (nameToSave) => {
		const cleanName = nameToSave.trim();
		if (!cleanName) return;

		setSessionPlayer(cleanName);
		saveGameScore(cleanName, score, wordsCount);
		setSavedPlayer(cleanName);
		toast.success(`Puntaje guardado para ${cleanName}`);
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		handleConfirmSave(playerName);
	};

	const isPrimaryRestart = savedPlayer || score === 0;

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

			{score > 0 && !savedPlayer && (
				<div className="save-score-box">
					{!isEditingName && sessionPlayer ? (
						<>
							<p>
								¿Sos <strong>{sessionPlayer}</strong>?
							</p>
							<div className="gameover-actions">
								<button
									type="button"
									className="btn-primary"
									onClick={() => handleConfirmSave(sessionPlayer)}
								>
									Sí, guardar puntaje
								</button>
								<button
									type="button"
									className="btn-secondary"
									onClick={() => {
										setPlayerName('');
										setIsEditingName(true);
									}}
								>
									No, soy otra persona
								</button>
							</div>
						</>
					) : (
						<form className="save-score-form" onSubmit={handleSubmitForm}>
							<input
								type="text"
								className="word-input"
								placeholder="Ingresá tu nombre..."
								value={playerName}
								onChange={(e) => setPlayerName(e.target.value)}
								maxLength={25}
								autoFocus
							/>
							<button
								type="submit"
								className="btn-primary"
								disabled={!playerName.trim()}
							>
								Guardar en Top 10
							</button>
						</form>
					)}
				</div>
			)}

			{savedPlayer && (
				<p className="saved-confirmation">
					Puntaje registrado para <strong>{savedPlayer}</strong>.
				</p>
			)}

			<button
				type="button"
				className={isPrimaryRestart ? 'btn-primary' : 'btn-secondary'}
				onClick={onRestart}
			>
				Jugar de nuevo
			</button>
		</div>
	);
}