<template>
	<div class="loginoptn">
		<h1>Login</h1>
		<h2>As</h2>
		<div class="optn">
			<button>User</button>
			<h2>Or</h2>
			<button>NGO/Police</button>
		</div>
	</div>
</template>
<script>
export default {};
</script>
<style scoped>
.loginoptn {
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: -webkit-linear-gradient(25rad, #000d3a, black);
	font-family: "Poppins", sans-serif;
	text-align: center;
	color: white;
}
.loginoptn h1 {
	margin-bottom: 3rem;
}
.loginoptn h2 {
	font-size: 1rem;
}
.optn button {
	font-size: 1rem;
	padding: 0.6rem 2.2rem;
	background: #afa2ff;
	border-radius: 31px;
	border: none;
	margin: 1rem 6rem;
	font-weight: bold;
	letter-spacing: 2px;
}
</style>
