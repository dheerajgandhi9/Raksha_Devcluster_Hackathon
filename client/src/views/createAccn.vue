<template>
	<div class="create">
		<h1>Create Account</h1>
		<form class="form" @submit.prevent="create">
			<label>
				<span>Name:</span> <br />
				<input type="text" required v-model="newuser.name" />
			</label>
			<label>
				<span>E-mail ID:</span> <br />
				<input type="email" required v-model="newuser.email" />
			</label>
			<label>
				<span>Contact Number:</span> <br />
				<input type="number" required v-modal="newuser.number" />
			</label>
			<label>
				<span>Password:</span> <br />
				<input type="password" required v-modal="newuser.password" />
			</label>
			<label>
				<span>Confirm Password:</span> <br />
				<input type="password" required v-modal="password" />
			</label>
			<div class="group">
				<button class="submit" type="submit">Create Account</button>
				<p class="question">Already a member?</p>
				<router-link to="/signup" class="alink">Sign Up</router-link>
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
			newuser: {
				name: null,
				number: null,
				email: null,
				password: null,
			},
		};
	},
	methods: {
		create() {
			axios
				.post("http://localhost:5000/user/add", this.newuser)
				.then((result) => {
					localStorage.setItem("Usertoken", result.data.token);
					this.$router.push("/");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
<style scoped>
.create {
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: -webkit-linear-gradient(25rad, #000d3a, black);
	font-family: "Roboto", sans-serif;
	text-align: center;
	color: white;
}
h1 {
	margin-bottom: 3rem;
}
.form {
	text-align: start;
	height: 70vh;
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
	border: none;
	padding: 1rem;
	outline: none;
	height: 1.3rem;
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
.alink {
	color: white;
	text-decoration: none;
	font-family: "Poppins";
	padding-bottom: 0.3rem;
	border-bottom: 1px solid white;
}
.question {
	margin-top: 1rem;
	margin-bottom: 0.5rem;
}
</style>
