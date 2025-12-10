<template>
  <main class="center-wrapper">
    <div class="signup-box">
      <h2>Welcome to PostIT</h2>
      <p>Create an Account</p>

      <form>
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="button" @click="signUp">Sign Up</button>
      </form>

      <router-link to="/login">Already have an account? Log in</router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: "signupView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    signUp() {
      var data = {email: this.email, password: this.password};
      console.log(data);
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        credentials: "include",
        body: JSON.stringify(data),
      }).then((response) => {
        response.json().then((data) => {
          console.log(data)
          console.log("login successful")
          location.assign("/");
        }).catch((error) => {
          console.log(error)
        });
      });
    },
  }
};
</script>

<style scoped>
/*---------------------*/
.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px); /* subtract navbar height */
}

/* signup Box */
.signup-box {
  background-color: #e0e0e0;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
}

.signup-box h2 {
  margin-bottom: 10px;
}

.signup-box a {
  color: #00aaff;
  display: block;
  margin: 5px 0;
}

.signup-box a ~ p {
  font-size: medium;
}

.signup-box input[type="email"],
.signup-box input[type="password"],
.signup-box input[type="text"] {
  width: 65%;
  padding: 8px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
}





/*-------------------*/

.signup-box {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
}
.error {
  color: red;
  font-size: 0.9em;
}

.signup-box button {
  width: 70%;
  padding: 8px;
  margin-top: 10px;
  background-color: #42a36b;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.signup-box button:hover {
  background-color: #54c77f;
}

</style>
