<template>
  <div class="home">
    <h1>Welcome to PostIT!</h1>
    <p>This is the homepage. Use the navigation to sign up.</p>
  </div>

  <main>
    <div id="sidebar-left">
      <p>sidebar-left</p>
    </div>
    <div id="main-content">
      Test
      <button id="logout" @click="Logout">Logout</button>

      <div class="posts-area">
        <p v-if="posts.length === 0">No posts yet.</p>

        <div v-else class="posts-list">
          <div
            class="post-card"
            v-for="post in posts"
            :key="post.id"
            @click="$router.push('/post/' + post.id)"
          >
            <div class="post-date">{{ formatDate(post.date) }}</div>
            <div class="post-body">{{ post.body }}</div>
          </div>
        </div>
      </div>
      <div class="bottom-buttons">
        <button class="action-btn" @click="goToAddPost">Add Post</button>
        <button class="action-btn delete-btn" @click="deleteAllPosts">Delete All Posts</button>
      </div>
    </div>
    <div id="sidebar-right">
      <p>sidebar-right</p>
    </div>
  </main>
</template>

<script>
export default {
  name: "AllPostsView",
  data() {
   return {
     posts: [],
    };
  },
  methods: {
    Logout(){
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include'})
          .then((response) => response.json())
          .then((data) => {
            console.log('jwt removed');
            location.assign("/");
          })
          .catch((err) => console.log("error logout"));
    },
    
    goToAddPost() {
      this.$router.push("/add-post");
    },

    async deleteAllPosts() {
      await fetch("http://localhost:3000/api/delete/allPosts", {
        method: "DELETE",
        credentials: "include",
      });
      alert("All posts deleted!");
    },

    async fetchPosts() {
      const res = await fetch("http://localhost:3000/api/posts", {
        credentials: "include",
      });
      const data = await res.json();
      this.posts = data;
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
  this.fetchPosts();
},
};
</script>



<style scoped>
.home {
  text-align: center;
  margin-top: 5rem;
}
main {
  display: flex;
  flex: 1;
  margin: 0 10px;
}

#main-content {
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 30px;
}

#sidebar-left,
#sidebar-right {
  background: #d9d9d9;
  border: 1px solid #c6c6c6;
  padding: 20px;
  border-radius: 10px;
  color: #2b2b2b;
  width: 200px;
  min-height: 400px;
}

#logout {
  display: block;
  color: white;
  border-width: 1px;
  padding: 1rem;
  background-color: #42a36b;
  border-radius: 1rem;
  margin: 0.75rem auto 0;
  transition: background-color 200ms ease, color 200ms ease;
  will-change: background-color, color;
}

#logout:hover {
  color: #35495e;
  background-color: #54c77f;
  cursor: grab;
}

.action-btn {
  display: block;
  color: white;
  padding: 1rem;
  background-color: #42a36b;
  border-radius: 1rem;
  margin: 0.75rem auto 0;
  border: none;
  width: 200px;
  cursor: pointer;
}

.action-btn:hover {
  color: #35495e;
  background-color: #54c77f;
  cursor: grab;
}

.delete-btn {
  background-color: #c94f4f;
}

.delete-btn:hover {
  background-color: #e06666;
}

.bottom-buttons {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.post-card {
  background: #e6e6e6;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.1s ease, background-color 0.2s ease;
}

.post-card:hover {
  background: #dcdcdc;
  transform: translateY(-2px);
}

.post-date {
  font-size: 0.85rem;
  color: #555;
  text-align: right;
  margin-bottom: 5px;
}

.post-body {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  white-space: pre-wrap; /* keeps line breaks */
}


</style>