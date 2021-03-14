<template>
	<div class="report">
		<Navbar></Navbar>
		<h1>Mark Suspicious</h1>
		<div class="map">
			<Maping v-on:btn-clicked="clicked($event)"></Maping>
		</div>

		<form @submit.prevent="onReport">
			<label id="problem">Problem</label> <br />
			<textarea rows="8" cols="50" v-model="reportdata.problem"></textarea>
			<br />
			<div class="priority">
				<label id="problem" for="priority">Priority</label>
				<br />
				<input type="radio" id="one" value="1" v-model="reportdata.priority" />
				<label class="radiolabel" for="one">Low</label>
				<input type="radio" id="two" value="2" v-model="reportdata.priority" />
				<label class="radiolabel" for="two">Medium</label>
				<input
					type="radio"
					id="three"
					value="3"
					v-model="reportdata.priority"
				/>
				<label class="radiolabel" for="two">High</label>
			</div>
			<button type="submit" class="submit">Report</button>
		</form>
	</div>
</template>
<script>
import Maping from "../components/map.vue";
import Navbar from "../components/navbar.vue";
import axios from "axios";
export default {
	name: "Report",
	components: { Maping, Navbar },
	data() {
		return {
			reportdata: {
				problem: "",
				priority: "",
				position: {},
				id: "",
			},
		};
	},
	methods: {
		clicked(location) {
			this.reportdata.position = location;
		},
		async onReport() {
			try {
				//   this.reportdata.id=localStorage.getItem("userid")
				this.reportdata.id = "604e13588151aa100868070c";
				console.log(this.reportdata.position);
				// console.log(this.reportdata.position)
				axios
					.put("http://localhost:5000/user/addComplain", this.reportdata)
					.then(() => {
						alert("Your report has been Filed");
						this.$router.push("/");
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				alert(error);
			}
		},
	},
};
</script>

<style scoped>
.report {
	height: 100vh;
	background: -webkit-linear-gradient(25rad, #000d3a, black);
}
h1,
label {
	color: white;
}
.report h1 {
	font-family: "Poppins";
	font-size: 1.4rem;
	margin-left: 1rem;
	color: white;
	margin-bottom: 1rem;
}
form {
	display: grid;
	align-items: center;
	justify-content: center;
	margin: 0 0.7rem;
}

#problem {
	margin-top: 2rem;
	font-size: 1.5rem;
}
textarea {
	border-radius: 6px;
}
.priority {
	margin-top: 1rem;
}
input[type="radio"] {
	margin-top: 1.2rem;
	margin-right: 1rem;
	margin-bottom: 2rem;
}
.radiolabel {
	margin-right: 3rem;
	font-size: 1.3rem;
}
.map {
	margin: 0 0.5rem;
}
button {
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
