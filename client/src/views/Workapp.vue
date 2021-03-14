<template>
	<div class="container">
		<div class="head">Guide</div>
		<div class="steps">
			<ul>
				<li>
					To Create an account, select user type(NGO/User/Police) and enter
					valid details
				</li>
				<li>Already have an account, Login by entering ID and Password</li>
				<li>Upon LoggingIn you will be directed to Homepage</li>
				<li>Click SOS if an emergency(will notify the Police)</li>
				<li>
					To report a case,mark the area on Map and describe the problem faced.
					Once done,click Report to submit the Problem.
				</li>
				<li>Read Help Section to know about Safety tips</li>
			</ul>
		</div>
		<div class="mark">
			<div class="head-1">Marker</div>
			<div class="red">Dangerous Areas</div>
			<div class="yellow">Reported Areas</div>
		</div>
		<div class="motto">
			Beware Of People Around You. Be Aware Of Your Surroundings.
		</div>
	</div>
</template>

<script>
export default {
	name: "Workapp",
};
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	background: -webkit-linear-gradient(25rad, #000d3a, black);
	color: white;
	margin: auto;
	gap: 30px;
	font-family: "Poppins";
	overflow: auto;
}

.head {
	font-size: 2rem;
	margin-top: 20px;
}

.steps {
	display: flex;
	flex-direction: column;
	width: 80%;
}

.steps li {
	padding: 0.4rem;
	list-style-type: disc;
}

.mark {
	display: flex;
	flex-direction: column;
	width: 80%;
	gap: 20px;
	color: rgb(0, 0, 255);
	font-weight: 900;
}
.head-1 {
	font-size: 1.2rem;
	text-align: center;
	color: white;
}
.red {
	width: 100%;
	background-color: rgb(255, 0, 0);
	padding: 0.5rem;
	text-align: center;
	font-size: 1rem;
}
.yellow {
	width: 100%;
	background-color: rgb(255, 238, 0);
	padding: 0.5rem;
	text-align: center;
	font-size: 1rem;
}
.motto {
	width: 80%;
	font-size: 1.3rem;
	font-weight: 900;
	text-align: center;
	color: rgb(244, 45, 90);
	margin-bottom: 30px;
}
</style>
