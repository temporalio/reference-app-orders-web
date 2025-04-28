export const capitalize = (word?: string): string => {
	if (!word) return '';
	return word[0].toUpperCase() + word.slice(1);
};

export const spaceBetweenCapitalLetters = (word: string): string => {
	return capitalize(word)
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.toUpperCase();
};
