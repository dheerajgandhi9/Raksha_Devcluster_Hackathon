<template>
	<div class="confirmcom">
		<h1>Confirm Complaint</h1>
		<div class="map">
			<Maping></Maping>
		</div>
		<h2>Problem</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, aspernatur.
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non
			similique adipisci quod distinctio ipsum facere officia, in dolorem, earum
			molestias
		</p>
		<button>Confirm</button>
	</div>
</template>
<script>
import Maping from "../components/map.vue";
export default {
	name: "Confirm_complaint",
	components: { Maping },
};
</script>
<style scoped>
.confirmcom {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	background: -webkit-linear-gradient(25rad, #000d3a, black);
	font-family: "Poppins", sans-serif;
	color: white;
}
.confirmcom h1 {
	font-size: 1.5rem;
	margin-bottom: 1rem;
}
.map {
	margin: 0 0.5rem;
}
h2 {
	margin-top: 3rem;
	align-self: center;
}
p {
	text-align: center;
	margin: 2rem 1rem 1rem 1rem;
}
button {
	font-size: 1rem;
	padding: 0.6rem 2.2rem;
	background: #afa2ff;
	border-radius: 31px;
	border: none;
	margin: 1.5rem 6rem;
	font-weight: bold;
	letter-spacing: 2px;
}
</style>
