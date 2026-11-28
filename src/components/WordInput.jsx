import { useState } from 'react';

export function WordInput({
	onSubmit,
	disabled,
	requiredLetter,
	isValidating,
}) {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await onSubmit(inputValue);
		if (success) {
			setInputValue('');
		}
	};

	const placeholder = requiredLetter
		? `Escribí una palabra con "${requiredLetter}"...`
		: 'Escribí cualquier palabra para comenzar...';

	return (
		<form className="word-form" onSubmit={handleSubmit}>
			<input
				type="text"
				className="word-input"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder={placeholder}
				disabled={disabled || isValidating}
				autoFocus
				autoComplete="off"
			/>
			<button
				type="submit"
				className="btn-primary"
				disabled={disabled || isValidating || !inputValue.trim()}
			>
				{isValidating ? 'Validando...' : 'Enviar'}
			</button>
		</form>
	);
}