<template>
    <div class="add-post-wrapper">
        <div class="add-post-box">
            <h2>Add Post</h2>

            <textarea 
                class="post-textarea"
                v-model="body"
                placeholder="Write something..."
            ></textarea>

            <button class="submit-btn" @click="submitPost">Submit</button>
        </div>
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

<style scoped>
.add-post-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  padding: 20px;
}

/* Box around the form */
.add-post-box {
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  width: 60%;
  max-width: 700px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

/* Title */
.add-post-box h2 {
  margin-bottom: 1rem;
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

/* Submit button styling */
.submit-btn {
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

.submit-btn:hover {
  background-color: #54c77f;
}
</style>