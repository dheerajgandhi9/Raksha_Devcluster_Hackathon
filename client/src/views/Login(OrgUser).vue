<template>
    <div class="Login">
      <h2>LOGIN</h2>
        <form class="form" @submit.prevent="login">
            <label>
            <span>NGO ID/Police St.ID</span> <br>
            <input type="text" required v-model="user.specialId"/>
            </label>
            <br>
            <label>
            <span>Password:</span> <br>
            <input type="password" required v-model="user.password"/>
            </label>
            <div class="group">
              <button class="submit" type="submit" >Login</button>
            </div>
          </form>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'OrgUser',
  data(){
      return{
        user:{
        specialId:null,
        password:null
        }

      }
  },
  methods:{
    login(){
      axios.post("http://localhost:5000/admin/login",this.user)
      .then(result=>{
        localStorage.setItem("adminid",result.data._id)
        localStorage.setItem("token",result.data.token)
        this.$router.push('/Dashboard')
      })
      .catch(error=>{
        console.log("Error: " + error)
      })
    }
  }
}
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
