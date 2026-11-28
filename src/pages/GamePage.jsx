import { useWordChainGame } from '../hooks/useWordChainGame';
import { GameStats } from '../components/GameStats';
import { WordInput } from '../components/WordInput';
import { WordChain } from '../components/WordChain';
import { GameOverCard } from '../components/GameOverCard';

export function GamePage() {
	const {
		words,
		score,
		timeLeft,
		status,
		isValidating,
		requiredLetter,
		submitWord,
		resetGame,
	} = useWordChainGame();

	return (
		<main className="page-container">
			<GameStats
				timeLeft={timeLeft}
				score={score}
				wordsCount={words.length}
				requiredLetter={requiredLetter}
				status={status}
			/>

			{status === 'finished' ? (
				<GameOverCard
					score={score}
					wordsCount={words.length}
					onRestart={resetGame}
				/>
			) : (
				<WordInput
					onSubmit={submitWord}
					disabled={status === 'finished'}
					requiredLetter={requiredLetter}
					isValidating={isValidating}
				/>
			)}

			<section className="chain-section">
				<h3>Cadena actual</h3>
				<WordChain words={words} />
			</section>
		</main>
	);
}