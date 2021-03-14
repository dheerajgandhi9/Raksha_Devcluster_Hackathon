<template>
	<div class="dashboard">
		<h1>Complains</h1>
		<div class="list">
			<div class="complain">
				<div class="info">
					<h2>Name: Dheeraj</h2>
					<h2>Contact: 123473463</h2>
				</div>
				<div class="buttons">
					<button class="view">View</button>
					<button
						class="delete
                    "
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Dashboard",
};
</script>
<style scoped>
.dashboard {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	background: -webkit-linear-gradient(25rad, #000d3a, black);
	font-family: "Poppins", sans-serif;

	color: white;
}
h1 {
	font-size: 1.5rem;
	margin-bottom: 1rem;
	margin-left: 1rem;
}
.list {
	background: white;
	border-radius: 5px;
	margin: 1rem 1rem;
}
.complain {
	padding: 0rem;
	margin: 1rem 1rem;
}

.complain span {
	color: #000d3ac9;
	font-size: 1rem;
	margin-bottom: 1rem;
}
button {
	border: none;
	margin-top: 0.4rem;
	border-radius: 7px;
	cursor: pointer;
	font-size: 1rem;
	padding: 0.5rem 2rem;
	background: #afa1ff;
}
.buttons {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 2rem;
}
.info {
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 0.2rem;
}

h2 {
	color: #000d3ab4;
	font-size: 1rem;
	letter-spacing: 1px;
}
.delete {
	background: rgba(255, 0, 0, 0.733);
}
</style>
