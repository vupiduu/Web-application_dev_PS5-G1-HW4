<template>
  <div class="add-post">
    <h2>Add Post</h2>

    <textarea v-model="body" placeholder="Write something..."></textarea>

    <button @click="submitPost">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      body: ""
    };
  },
  methods: {
    async submitPost() {
      await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: this.body })
      });
      this.$router.push("/");
    }
  }
};
</script>
