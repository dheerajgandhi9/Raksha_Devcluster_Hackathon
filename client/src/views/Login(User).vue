<template>
	<div class="Login">
		<h1>Login</h1>
		<form class="form" @submit.prevent="login">
			<label>
				<span>E-mail ID:</span> <br />
				<input type="email" required v-model="email" />
			</label>
			<br />
			<label>
				<span>Password:</span> <br />
				<input type="password" required v-modal="password" />
			</label>
			<div class="group">
				<button class="submit" type="submit">Login</button>
				<p class="question">Or</p>
				<router-link to="/create" class="alink">Sign Up</router-link>
			</div>
		</form>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "LoginUser",
	data() {
		return {
			user: {
				emai: null,
				password: null,
			},
		};
	},
	methods: {
		login() {
			axios
				.post("http://localhost:5000/user/login", this.user)
				.then((result) => {
					localStorage.setItem("Usertoken", result.data.token);
					this.$router.push("/");
				})
				.catch((error) => {
					console.log(error.message);
				});
		},
	},
};
</script>
<style scoped>
.Login {
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
h1 {
	margin-bottom: 3rem;
}
.form {
	text-align: start;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.group {
	text-align: center;
}
span {
	font-size: 1.2rem;
}
label input {
	margin-top: 0.5rem;
	border-radius: 7px;
	padding: 1rem;
	border: none;
	outline: none;
	height: 1.5rem;
	width: 14rem;
}
.submit {
	margin-top: 2rem;
	border: none;
	border-radius: 7px;
	cursor: pointer;
	font-size: 1rem;
	padding: 0.7rem 3rem;
	background: #afa1ff;
	margin-bottom: 1rem;
}
.question {
	margin-bottom: 1rem;
}
.alink {
	color: white;
	text-decoration: none;
	font-family: "Poppins";
	padding-bottom: 0.3rem;
	border-bottom: 1px solid white;
}
</style>
