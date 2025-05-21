<template>
	<div>
		<h2>Weather App</h2>
		<p v-if="temp !== null">London Temperature: {{ temp }} °C</p>
		<p v-else>Loading...</p>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const temp = ref(null);

onMounted(async () => {
	try {
		const res = await fetch('http://localhost:3000/api/weather');
		const data = await res.json();

		if (data.main && data.main.temp) {
			temp.value = data.main.temp;
		} else {
			console.error('Unexpected API response:', data);
		}
	} catch (e) {
		console.error('Failed to fetch temperature:', e);
	}
});
</script>
