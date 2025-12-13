<template>
  <div v-if="post">
    <h2>Post from {{ post.date }}</h2>

    <textarea v-model="post.body"></textarea>

    <button @click="updatePost">Update</button>
    <button @click="deletePost">Delete</button>
  </div>
</template>

<script>
export default {
  data() {
    return { post: null };
  },
  async created() {
    const id = this.$route.params.id;
    const res = await fetch(`http://localhost:3000/api/post/${id}`, {
      credentials: "include"
    });
    const data = await res.json();
    this.post = data[0];   // backend returns an array
  },
  methods: {
    async updatePost() {
      await fetch(`http://localhost:3000/api/post/${this.post.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ body: this.post.body })
      });

      this.$router.push("/");
    },

    async deletePost() {
      await fetch(`http://localhost:3000/api/post/${this.post.id}`, {
        method: "DELETE",
        credentials: "include"
      });

      this.$router.push("/");
    }
}
};
</script>
