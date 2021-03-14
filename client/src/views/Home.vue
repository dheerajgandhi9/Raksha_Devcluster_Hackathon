<template>
	<div class="home">
		<img src="../assets/homeimg.svg" alt="" />
		<div class="text">
			<h1>YOUR SAFETY</h1>
			<h2>OUR DUTY</h2>
		</div>
		<div class="btn">
			<button class="sos" @click="sos">SOS</button>
		</div>
		<div class="map">
			<Maping v-on:btn-clicked="clicked($event)"></Maping>
		</div>
	</div>
</template>
<script>
import Maping from "../components/map.vue";
export default {
	name: "Home",
	components: { Maping },
    data(){
        return{
            position:{}
        }
    },
    methods:{
        clicked(location){
			this.position=location;
			console.log(this.position);
		},
        sos(){
            this.$router.push('/helpline')
        }
    }
};
</script>
<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.home {
	background: -webkit-linear-gradient(25rad, #000d3a, black);
	height: 100%;
	width: 100vw;
}
.home img {
	float: right;
}
.home h1,
h2 {
	font-family: "Poppins";
	letter-spacing: 3px;
	color: white;
	white-space: nowrap;
	font-size: 1.8rem;
}
.home h2 {
	margin-left: 5rem;
	margin-top: 0.5rem;
}
.text {
	left: 1rem;
	position: relative;
	width: 90%;
	top: 10rem;
}
.btn {
	margin-top: 17rem;
	text-align: center;
	margin-bottom: 2rem;
}
.sos {
	cursor: pointer;
	font-size: 1.2rem;
	padding: 1rem 2.5rem;
	background: rgba(255, 126, 126);
	box-shadow: 0px 0px 20px 5px rgba(255, 0, 0, 0.46);
	border-radius: 100px;
	border: none;
	font-weight: bold;
}
.btn2 {
	text-align: center;
	margin-bottom: 1rem;
}
.locate {
	font-size: 1rem;
	padding: 0.6rem 2.2rem;
	background: #afa2ff;
	border-radius: 31px;
	border: none;
	font-weight: bold;
	position: relative;
	top: -1.2rem;
	z-index: 200;
	letter-spacing: 2px;
}
.map {
	margin: 0 0.5rem;
}
</style>
