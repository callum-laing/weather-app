<template>
	<div>
		<h2>Weather App</h2>
		<input v-model="city" placeholder="Enter a city" />
		<button @click="fetchWeather">Get Weather</button>

		<p v-if="temp !== null">City: {{ currentCity }}</p>
		<p v-if="temp !== null">Temperature: {{ temp }} °C</p>

		<p v-else-if="loading">Loading...</p>
		<p v-else-if="error">{{ error }}</p>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const temp = ref(null);
const city = ref('');
const currentCity = ref('');
const loading = ref(false);
const error = ref('');

const fetchWeather = async () => {
	loading.value = true;
	error.value = '';
	temp.value = null;
	currentCity.value = '';

	try {
		const res = await fetch(
			`http://localhost:3000/api/weather?city=${encodeURIComponent(city.value)}`
		);
		const data = await res.json();

		if (data.main && data.main.temp) {
			temp.value = data.main.temp;
			currentCity.value = data.name;
		} else if (data.message) {
			error.value = `Error: ${data.message}`;
		} else {
			error.value = 'Unexpected response.';
			console.error('Unexpected API response:', data);
		}
	} catch (e) {
		error.value = 'Failed to fetch temperature.';
		console.error(e);
	} finally {
		loading.value = false;
	}
};
</script>
