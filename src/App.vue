<script setup>

import HeaderComponent from "@/components/HeaderComponent.vue";
</script>
<template>
  <header-component/>
  <router-view />
</template>

<style scoped>
* {
  box-sizing: border-box;
}
body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
