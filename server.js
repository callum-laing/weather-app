import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 3000;
const apiKey = process.env.WEATHER_API_KEY;

app.use(cors());

app.get('/api/weather', async (req, res) => {
	try {
		const city = req.query.city || 'London';
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
				city
			)}&units=metric&appid=${apiKey}`
		);
		const data = await response.json();
		res.json(data);
	} catch (err) {
		res.status(500).json({ error: 'Something went wrong' });
	}
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
