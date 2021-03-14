<template>
	<div class="container">
		<Navbar></Navbar>
		<div class="head">Help</div>
		<div class="help-nos">
			<h1>Helpline nos:</h1>
			<ul>
				<li>Women Helpline ( All India ) : 1091</li>
				<li>Women Helpline Domestic Abuse : 181</li>
				<li>Police : 100</li>
				<li>National Emergency Number : 112</li>
			</ul>
		</div>
		<div class="tips">
			<h1>Safety Tips:</h1>
			<div class="para">
				Stay in a well-lit public area. Don’t go home or turn away from
				crowds.If possible, travel on well lit, busy streets and avoid isolated
				back roads and short cuts.If your are being followed, drive to the
				nearest open business for help. Avoid shortcuts through parks, vacant
				lots, and other deserted places.
			</div>
			<div class="para">
				Call the police. Find a well-lit public area and dial 1091 or 100 if you
				feel you’re in danger.
			</div>
			<div class="para">
				Carry protection. Whether pepper spray, a personal safety alarm, or a
				lipstick taser, self-defense tools can help you feel more at ease.
			</div>
		</div>
	</div>
</template>
<script>
import Navbar from "../components/navbar.vue";
export default {
	name: "Helpline",
};
</script>
<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
li {
	list-style-type: none;
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	background: -webkit-linear-gradient(25rad, #000d3a, black);
	color: white;
	margin: auto;
	gap: 30px;
	font-family: "Poppins";
}

.head {
	font-size: 2rem;
	margin-top: 20px;
}
.help-nos {
	display: flex;
	flex-direction: column;
	width: 80%;
}
.help-nos h1,
.tips h1 {
	font-size: 1.3rem;
	padding: 0.5rem;
	color: rgb(119, 125, 172);
}
.help-nos ul {
	display: flex;
	flex-direction: column;
}

.help-nos li {
	padding: 0.5rem;
}
.tips {
	display: flex;
	flex-direction: column;
	width: 80%;
	margin-bottom: 20px;
}

.tips .para {
	padding: 0.5rem;
}
</style>
