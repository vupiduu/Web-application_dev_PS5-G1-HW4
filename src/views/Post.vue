<template>
  <div class="edit-post-wrapper" v-if="post">
    <div class="edit-post-box">
      <h2>Edit Post from {{ formatDate(post.date) }}</h2>

      <textarea 
        v-model="post.body" 
        class="post-textarea"
      ></textarea>

      <div class="button-row">
        <button class="update-btn" @click="updatePost">Update</button>
        <button class="delete-btn" @click="deletePost">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: "",
        body: "",
        date: "",
      },
    };
  },
  methods: {
    fetchAPost(id) {
      fetch(`http://localhost:3000/api/post/${id}`, {
        credentials: "include"
      })
          .then((response) => response.json())
          .then((data) => {this.post = data[0]})
          .catch((err) => console.log(err.message));
    },
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
    },
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
},
  mounted() {
    this.fetchAPost(this.$route.params.id);
  },
};
</script>

<style scoped>
    /* Center the whole page */
    .edit-post-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 120px);
    padding: 20px;
    }

    /* White card container */
    .edit-post-box {
    background-color: white;
    padding: 2rem;
    border-radius: 15px;
    width: 60%;
    max-width: 700px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    text-align: center;
    }

    /* Title styling */
    .edit-post-box h2 {
    margin-bottom: 1rem;
    color: #2b2b2b;
    }

    /* Textarea styling */
    .post-textarea {
    width: 100%;
    height: 150px;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #aaa;
    resize: none;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    }

    /* Button row (side-by-side) */
    .button-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    }

    /* Update button */
    .update-btn {
    padding: 0.8rem 2rem;
    background-color: #42a36b;
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 200ms ease;
    }

    .update-btn:hover {
    background-color: #54c77f;
    }

    /* Delete button */
    .delete-btn {
    padding: 0.8rem 2rem;
    background-color: #c94f4f;
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 200ms ease;
    }

    .delete-btn:hover {
    background-color: #e06666;
    }

</style>