<template>
	<div class="main">
		<nav>
			<div id="logo">
				<h1>Raksha</h1>
			</div>
			<ul class="nav-links">
				<li>
					<a href="">Home</a>
				</li>
				<li>
					<a href="">Report</a>
				</li>
				<li>
					<a href="">Help</a>
				</li>
				<li>
					<a href="">login</a>
				</li>
			</ul>
			<div v-on:click="openMobileNav()" id="burger">
				<div class="line1"></div>
				<div class="line2"></div>
				<div class="line3"></div>
			</div>
		</nav>
	</div>
</template>
<script>
export default {
	name: "Navbar",
	methods: {
		openMobileNav() {
			const burger = document.getElementById("burger");
			const nav = document.querySelector(".nav-links");
			const navLinks = document.querySelectorAll(".nav-links li");
			// Toggle navigation on mobile
			nav.classList.toggle("nav-active");
			// Burger toggler
			burger.classList.toggle("toggle");
			// Animate navigation links
			navLinks.forEach((link, index) => {
				if (link.style.animation || link.style.webkitAnimation) {
					link.style.animation = "";
					link.style.webkitAnimation = "";
				} else {
					link.style.webkitAnimation = `navLinkFade 0.5s ease forwards ${index /
						7}s`;
					link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`;
				}
			});
		},
		openDropdownNav() {
			const dropdownLink = document.querySelectorAll(".dropdown-link");
			dropdownLink.forEach((dropdown) => {
				dropdown.addEventListener("mouseover", () => {
					dropdown.children[1].style.display = "block";
				});
				dropdown.addEventListener("mouseleave", () => {
					dropdown.children[1].style.display = "none";
				});
			});
		},
		/* Run only on mobile
       
       This code below here will change the behavior of mobile menu links.
       when you click for once it will open the drop down & by the
       second click it will lead you to the link page if you don't
       want to go in dropdown links
    */
		countClicksOnMobileDropdown() {
			const dropdownLink = document.querySelectorAll(".dropdown-link");
			dropdownLink.forEach((dropdown) => {
				let counts = dropdown.clicks || 0;
				dropdown.addEventListener("click", () => {
					counts++;
					if (counts % 2 == 0) {
						window.location.href = dropdown.children[0].getAttribute("href");
					} else {
						event.preventDefault();
						dropdown.children[1].style.display = "block";
						setTimeout(() => {
							dropdown.children[1].style.display = "none";
						}, 5000);
					}
				});
				setTimeout(() => {
					counts = 0;
				}, 8000);
			});
		},
	},
	mounted() {
		this.openDropdownNav();
		if (window.innerWidth < 768) {
			this.countClicksOnMobileDropdown();
		}
	},
};
</script>
<style scoped>
nav {
	margin-bottom: 2rem;
	z-index: 200;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #11093b;
	min-height: 8vh;
	font-family: "Montserrat", sans-serif;
}
div#logo {
	letter-spacing: 5px;
	color: #fefefe;
	font-weight: 800;
	font-size: 2rem;
}
ul.nav-links {
	display: flex;
	justify-content: space-between;
	width: 40%;
	line-height: 75px;
}
ul.nav-links li {
	list-style: none;
}
ul.nav-links a {
	text-decoration: none;
	color: #fefefe;
	font-size: 1.2rem;
	font-weight: 500;
	display: block;
}
#burger {
	display: none;
	cursor: pointer;
}
#burger div {
	width: 30px;
	height: 3px;
	margin: 8px 0;
	background-color: #fefefe;
	transition: all 0.3s ease-in;
}
ul.dropdown-menu {
	position: absolute;
	top: 8vh;
	background-color: #090433;
	min-width: 140px;
	cursor: pointer;
	display: none;
}
ul.dropdown-menu li:first-child {
	margin: 0 0 10px 0;
}
ul.dropdown-menu li {
	margin: 10px 0;
}
ul.dropdown-menu li:last-child {
	margin: 10px 0 0 0;
}
ul.dropdown-menu a {
	line-height: 8vh;
	padding: 5px 15px;
	background-color: #f1d1d1;
	line-height: 50px;
}
@media screen and (max-width: 1024px) {
	ul.nav-links {
		width: 50%;
	}
}
/* Mobile */
@media screen and (max-width: 768px) {
	#logo h1 {
		font-size: 1.1rem;
	}
	ul.nav-links {
		position: absolute;
		flex-direction: column;
		width: 70%;
		height: 92vh;
		top: 8vh;
		z-index: 300;
		right: 0;
		padding: 100px;
		align-items: center;
		justify-content: flex-start;
		background-color: #000d3a;
		opacity: 1;
		transform: translateX(100%);
		transition: transform 0.5s ease-in;
	}
	ul.nav-links li {
		opacity: 1;
	}
	ul.nav-links a {
		width: 100%;
	}
	div#burger {
		display: block;
	}
	ul.dropdown-menu {
		position: relative;
		top: 0;
	}
}
.nav-active {
	transform: translateX(0) !important;
}
.toggle .line1 {
	transform: rotate(-45deg) translate(-9px, 10px);
}
.toggle .line2 {
	opacity: 0;
}
.toggle .line3 {
	transform: rotate(45deg) translate(-5px, -6px);
}
@keyframes navLinkFade {
	from {
		opacity: 0;
		transform: translateX(-60px);
	}
	to {
		opacity: 1;
		transform: translateX(0px);
	}
}
</style>
