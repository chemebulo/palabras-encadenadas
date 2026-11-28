import axios from 'axios';

const wordApi = axios.create({
	baseURL: 'https://word-api-hmlg.vercel.app',
	timeout: 8000,
});

export async function validateWordExists(word) {
	const { data } = await wordApi.get('/api/validate', {
		params: { word },
	});
	return Boolean(data?.exists);
}