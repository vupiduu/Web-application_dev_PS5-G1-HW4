<script setup>

import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>
<template>
  <header-component/>
  <router-view />
  <FooterComponent />
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
