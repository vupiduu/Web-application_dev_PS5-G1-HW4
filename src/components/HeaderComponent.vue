<script setup>

</script>

<template>
  <header class="app-header">
    <h1>{{ title }}</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/signup">Signup</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/test">Test</router-link>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  background-color: #42b983;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  padding: 1rem;
  background-color: #42a36b;
  border-radius: 2rem;
  transition: background-color 200ms ease, color 200ms ease;
  will-change: background-color, color;
}

nav a:hover {
  color: #35495e;
  background-color: #54c77f;

}
</style>
