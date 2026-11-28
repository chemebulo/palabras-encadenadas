import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { validateWordExists } from '../services/wordService';
import { validateLocalRules, normalizeForComparison } from '../utils/wordRules';

const TURN_DURATION = 15;

export function useWordChainGame() {
	const [words, setWords] = useState([]);
	const [timeLeft, setTimeLeft] = useState(TURN_DURATION);
	const [status, setStatus] = useState('idle');
	const [isValidating, setIsValidating] = useState(false);

	const statusRef = useRef(status);
	statusRef.current = status;

	const score = words.reduce((total, word) => total + word.length, 0);
	const lastWord = words[words.length - 1] || null;
	const requiredLetter = lastWord
		? normalizeForComparison(lastWord).slice(-1).toUpperCase()
		: null;

	useEffect(() => {
		if (status !== 'playing') return;

		const intervalId = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(intervalId);
					setStatus('finished');
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [status]);

	const submitWord = async (rawWord) => {
		if (status === 'finished' || isValidating) return false;

		const localCheck = validateLocalRules(rawWord, words);
		if (!localCheck.valid) {
			toast.error(localCheck.reason);
			return false;
		}

		setIsValidating(true);
		try {
			const exists = await validateWordExists(localCheck.cleanWord);

			if (statusRef.current === 'finished') return false;

			if (!exists) {
				toast.error('La palabra no existe.');
				return false;
			}

			setWords((prev) => [...prev, localCheck.cleanWord]);
			setTimeLeft(TURN_DURATION);
			if (statusRef.current === 'idle') {
				setStatus('playing');
			}

			toast.success(`+${localCheck.cleanWord.length} puntos`);
			return true;
		} catch {
			toast.error('No se pudo validar la palabra. Intentá nuevamente.');
			return false;
		} finally {
			setIsValidating(false);
		}
	};

	const resetGame = () => {
		setWords([]);
		setTimeLeft(TURN_DURATION);
		setStatus('idle');
		setIsValidating(false);
	};

	return {
		words,
		score,
		timeLeft,
		status,
		isValidating,
		requiredLetter,
		submitWord,
		resetGame,
	};
}