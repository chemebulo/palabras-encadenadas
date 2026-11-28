import { useState, useRef } from 'react';

const MAX_WORD_LENGTH = 22;

export function WordInput({ onSubmit, disabled, requiredLetter, isValidating }) {
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await onSubmit(inputValue);
		if (success) {
			setInputValue('');
		}
		inputRef.current?.focus();
	};

	const letters = inputValue.toUpperCase().split('');

	return (
		<form className="word-tiles-form" onSubmit={handleSubmit}>
			<div
				className="tiles-board"
				onClick={() => inputRef.current?.focus()}
			>
				<input
					ref={inputRef}
					type="text"
					className="hidden-word-input"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					maxLength={MAX_WORD_LENGTH}
					disabled={disabled || isValidating}
					autoFocus
					autoComplete="off"
					aria-label="Ingresar palabra"
				/>

				{letters.length === 0 ? (
					<div className="letter-tile tile-hint">
						{requiredLetter || '?'}
					</div>
				) : (
					letters.map((char, index) => (
						<div key={index} className="letter-tile tile-filled">
							{char}
						</div>
					))
				)}
			</div>

			<div className="tiles-actions">
				<span className="tiles-hint-text">
					{requiredLetter
						? `Empezá con "${requiredLetter}" · Enter para enviar`
						: 'Escribí cualquier palabra · Enter para comenzar'}
				</span>
				<button
					type="submit"
					className="btn-primary"
					disabled={disabled || isValidating || !inputValue.trim()}
				>
					{isValidating ? 'Validando...' : 'Enviar'}
				</button>
			</div>
		</form>
	);
}