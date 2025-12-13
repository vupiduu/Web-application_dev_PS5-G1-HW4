<template>
  <div v-if="post">
    <h2>Post from {{ post.date }}</h2>

    <textarea v-model="post.body"></textarea>

    <button @click="updatePost">Update</button>
    <button @click="deletePost">Delete</button>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return { post: null };
  },
  async created() {
    const { id } = this.$route.params;
    const res = await axios.get(`/posts/${id}`);
    this.post = res.data;
  },
  methods: {
    async updatePost() {
      await axios.put(`/posts/${this.post.id}`, { body: this.post.body });
      this.$router.push("/");
    },
    async deletePost() {
      await axios.delete(`/posts/${this.post.id}`);
      this.$router.push("/");
    }
  }
};
</script>
