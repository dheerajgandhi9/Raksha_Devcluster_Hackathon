<template>
    <div class="Login">
      <h2>Login</h2>
        <form class="form" @submit.prevent="login">
            <label>
            <span>Email Address:</span> <br>
            <input type="email" required v-model="email"/>
            </label>
            <br>
            <label>
            <span>Password:</span> <br>
            <input type="password" required v-modal="password"/>
            </label>
            <button class="submit" type="submit" >Log In</button>
            <p class="question">New here?</p>
            <router-link to="/signup">Sign Up</router-link>
            </form>
    </div>
</template>
<script>

export default {
  name: 'LoginUser',
  data(){
      return{
        email:null,
        password:null
      }
  },
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
  font-family: Poppins, sans-serif;
  text-align: center;
}
.form{
  text-align: start;
}

</style>