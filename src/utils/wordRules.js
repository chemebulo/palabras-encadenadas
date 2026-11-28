export function normalizeForComparison(word) {
	return word
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u0302\u0304-\u036f]/g, '')
		.normalize('NFC');
}

export function validateLocalRules(rawWord, wordsChain) {
	const cleanWord = rawWord.trim().toLowerCase();

	if (!cleanWord) {
		return { valid: false, reason: 'Ingresá una palabra.' };
	}

	const normalizedNew = normalizeForComparison(cleanWord);
	const alreadyUsed = wordsChain.some(
		(w) => normalizeForComparison(w) === normalizedNew,
	);

	if (alreadyUsed) {
		return { valid: false, reason: 'La palabra ya fue utilizada.' };
	}

	if (wordsChain.length > 0) {
		const previousWord = wordsChain[wordsChain.length - 1];
		const lastChar = normalizeForComparison(previousWord).slice(-1);
		const firstChar = normalizedNew.charAt(0);

		if (firstChar !== lastChar) {
			return {
				valid: false,
				reason: 'La palabra no respeta la regla de encadenamiento.',
			};
		}
	}

	return { valid: true, cleanWord };
}