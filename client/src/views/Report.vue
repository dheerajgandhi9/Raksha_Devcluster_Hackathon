<template>
	<div class="report">
		<h1>Mark Suspicious</h1>
		<div class="map">
			<Maping v-on:btn-clicked="clicked($event)"></Maping>
		</div>

		<form  @submit.prevent="onReport">
			<label id="problem">Problem</label> <br />
			<textarea rows="8" cols="50" v-model="reportdata.problem"></textarea>
			<br />
			<div class="priority">
				<label id="problem" for="priority">Priority</label>
				<br />
				<input type="radio" id="one" value="One" v-model="reportdata.picked" />
				<label class="radiolabel" for="one">Low</label>
				<input type="radio" id="two" value="Two" v-model="reportdata.picked" />
				<label class="radiolabel" for="two">Medium</label>
				<input type="radio" id="three" value="Three" v-model="reportdata.picked" />
				<label class="radiolabel" for="two">High</label>
			</div>
			<button type="submit"  class="submit" >Report</button>
		</form>
	</div>
</template>
<script>
import Maping from "../components/map.vue";
export default {
	name: "Report",
	components: { Maping },
	data(){
		return{
			reportdata:{
				problem:'',
				picked:'',
				position:{},
			}
		}
	},
	methods:{
		clicked(location){
			this.position=location;
		},
	async onReport () { 
      try {
        alert('Your report has been Filed') 
        // this.studentform = null; 
      } catch (error) {
        alert(error)
      }
	}
	}
}
</script>

<style scoped>
.report {
	height: 100vh;
	background: -webkit-linear-gradient(25rad, #000d3a, black);
}
h1,label{
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
button{
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
