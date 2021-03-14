<template>
	<div>
		<l-map
			ref="map"
			@dblclick="onMapClick"
			:zoom="zoom"
			:center="[
				position.lat || userLocation.lat || defaultLocation.lat,
				position.lng || userLocation.lng || defaultLocation.lng,
			]"
			id="mapview"
		>
			<l-tile-layer
				:url="tileProvider.url"
				:attribution="tileProvider.attribution"
			/>
			<l-geosearch :options="geoSearchOptions" id="geoSearch"></l-geosearch>
			<l-marker
				v-if="position.lat && position.lng"
				visible
				draggable
				:icon="icon"
				:lat-lng.sync="position"
				@dragstart="dragging = true"
				@dragend="dragging = false"
			>
				<l-tooltip :content="tooltipContent" :options="{ permanent: true }" />
			</l-marker>
			<l-marker
				v-for="(marker, index) in markers"
				:key="index"
				:lat-lng="latLong(marker.lat, marker.long)"
				:icon="getIcon()"
			></l-marker>
			<l-marker
				v-for="(ymarker, index) in ymarkers"
				:key="index"
				:lat-lng="latLong(ymarker.report[0].lat, ymarker.report[0].long)"
				:icon="getYIcon()"
			></l-marker>
		</l-map>
		<button z-index="500" type="submit" @click="btnclicked">
			Confirm Location?
		</button>
	</div>
</template>
<script>
import L from "leaflet";
import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LGeosearch from "vue2-leaflet-geosearch";
import { icon } from "leaflet";
import axios from "axios";
export default {
	components: {
		LMap,
		LTileLayer,
		LMarker,
		LTooltip,
		LGeosearch,
	},
	props: {
		value: {
			type: Object,
			required: true,
		},
		defaultLocation: {
			type: Object,
			default: () => ({
				lat: 15.464213,
				lng: 73.849571,
			}),
		},
	},
	data() {
		return {
			loading: false,
			geoSearchOptions: {
				provider: new OpenStreetMapProvider(),
				showMarker: false,
				autoClose: true,
			},
			userLocation: {},
			icon: icon({
				iconUrl:
					"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
				shadowUrl:
					"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				shadowSize: [41, 41],
			}),
			position: {
				lat: 15.2564305,
				lng: 73.9664153,
			},
			address: "NH66, Navelim, Salcete,South Goa, 403761, India",
			tileProvider: {
				attribution:
					'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
				url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			},
			zoom: 17,
			dragging: false,
			marker: L.latLng(47.412, 23.45),
			markers: [],
			ymarkers: [],
		};
	},
	mounted() {
		const id = "604cec0e3d26c82decacff8f";
		axios.get("http://localhost:5000/admin/get-complain/" + id).then((res) => {
			console.log(res.data);
			this.markers = res.data;
		});
		axios.get("http://localhost:5000/user/showReport").then((res) => {
			console.log(res.data);
			this.ymarkers = res.data;
		});

		this.getUserPosition();
		this.$refs.map.mapObject.on("geosearch/showlocation", this.onSearch);
	},
	watch: {
		position: {
			deep: true,
			async handler(value) {
				this.address = await this.getAddress();
				this.$emit("input", { position: value, address: this.address });
			},
		},
	},
	computed: {
		tooltipContent() {
			if (this.dragging) return "...";
			if (this.loading) return "Loading...";
			return `<strong>${this.address.replace(
				",",
				"<br/>"
			)}</strong> <hr/><strong>lat:</strong> ${
				this.position.lat
			}<br/> <strong>lng:</strong> ${this.position.lng}`;
		},
	},
	methods: {
		latLong: function(lat, long) {
			return L.latLng(lat, long);
		},
		async getAddress() {
			this.loading = true;
			let address = "Unresolved address";
			try {
				const { lat, lng } = this.position;
				const result = await fetch(
					`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
				);
				if (result.status === 200) {
					const body = await result.json();
					address = body.display_name;
				}
			} catch (e) {
				console.error("Reverse Geocode Error->", e);
			}
			this.loading = false;
			return address;
		},
		async onMapClick(value) {
			// place the marker on the clicked spot
			this.position = value.latlng;
		},
		onSearch(value) {
			const loc = value.location;
			this.position = { lat: loc.y, lng: loc.x };
			console.log(this.position);
		},
		async getUserPosition() {
			if (navigator.geolocation) {
				// get GPS position
				navigator.geolocation.getCurrentPosition((pos) => {
					// set the user location
					this.userLocation = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					};
				});
			}
		},
		getIcon() {
			const redIcon = new L.Icon({
				iconUrl:
					"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
				shadowUrl:
					"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				shadowSize: [41, 41],
			});
			return redIcon;
		},
		getYIcon() {
			const redIcon = new L.Icon({
				iconUrl:
					"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
				shadowUrl:
					"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				shadowSize: [41, 41],
			});
			return redIcon;
		},
		btnclicked() {
			this.$emit("btn-clicked", this.position);
		},
	},
};
</script>
<style>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
#mapview {
	position: relative;
	width: 100%;
	height: 50rem;
	z-index: 100;
}
#mapview .leaflet-control-geosearch form {
	padding: 0 0;
}
#mapview .leaflet-control-geosearch a.reset {
	height: 25px;
	line-height: 27px;
}
#mapview .leaflet-control-geosearch a.leaflet-bar-part.leaflet-bar-part-single {
	height: 25px;
}
button {
	font-size: 1rem;
	padding: 0.6rem 2.2rem;
	background: red;
	border-radius: 31px;
	border: none;
	font-weight: bold;
	position: relative;
	top: -1.2rem;
	z-index: 200;
	color: white;
	letter-spacing: 2px;
}
</style>
