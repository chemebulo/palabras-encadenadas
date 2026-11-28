const STORAGE_KEY = 'palabras_encadenadas_top10';
const SESSION_PLAYER_KEY = 'palabras_encadenadas_player';

export function getSessionPlayer() {
	return sessionStorage.getItem(SESSION_PLAYER_KEY) || '';
}

export function setSessionPlayer(name) {
	const cleanName = name.trim();
	if (cleanName) {
		sessionStorage.setItem(SESSION_PLAYER_KEY, cleanName);
	}
}

export function getTopScores() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

export function saveGameScore(playerName, score, wordsCount) {
	if (score <= 0) return;

	const cleanName = playerName.trim() || 'Anónimo';
	const current = getTopScores();
	const newEntry = {
		id: crypto.randomUUID(),
		playerName: cleanName,
		score,
		wordsCount,
		date: new Date().toLocaleDateString('es-AR'),
	};

	const updated = [...current, newEntry]
		.sort((a, b) => b.score - a.score || b.wordsCount - a.wordsCount)
		.slice(0, 10);

	localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}