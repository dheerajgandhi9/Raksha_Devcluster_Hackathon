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
              <p class="question">Or</p>
              <router-link to="/create" class="alink">Sign Up</router-link>
            </div>
          </form>
    </div>
</template>
<script>  
import axios from'axios'
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
.Login{
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column ;
  background: -webkit-linear-gradient(25rad, #000D3A, black);
  font-family:'Roboto', sans-serif;
  text-align: center;
  color: white;
}
h2{
  font-size: 1.3rem;
  font-weight: 500;
  position: relative;
  bottom: 2rem;
}
.form{
  text-align: start;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.group{
  text-align: center;
}
label span, .submit{
  font-size: 1rem;
  font-weight: 500;
}
label input{
  margin-top: 0.5rem;
  border-radius: 7px;
  border: none;
  outline: none;
  height: 1.5rem;
  width: 14rem;
}
.submit{
  margin-top: 2rem;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  width: 6.5rem;
  padding: 0.3rem 0;
  background: #AFA1FF;
  font-weight: 500;
}
.alink{
  color: white;
  text-decoration: none;
  font-family: 'Poppins';
  padding: 0.3rem 0;
  border-bottom: 1px solid white;
}
</style>