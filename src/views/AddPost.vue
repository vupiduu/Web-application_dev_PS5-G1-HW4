<template>
  <div class="add-post">
    <h2>Add Post</h2>

    <textarea v-model="body" placeholder="Write something..."></textarea>

    <button @click="submitPost">Submit</button>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      body: ""
    };
  },
  methods: {
    async submitPost() {
      await axios.post("/api/posts", { body: this.body });
      this.$router.push("/");
    }
  }
};
</script>
