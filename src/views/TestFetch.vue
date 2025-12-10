<template>
  Hello World
</template>

<script>
export default {
  name: "TestFetch",
    data() {
      return {
        posts: [],
      };
    },
    methods: {
      fetchPosts() {
        fetch(`http://localhost:3000/api/posts/`)
            .then((response) => response.json())
            .then((data) => {
              this.posts = data
              console.log(data)})
            .catch((err) => console.log(err.message));
      },
    },
    mounted() {
      this.fetchPosts();
      console.log("mounted");
    }
};
</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto;
  background: rgb(167, 154, 154);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: blue;
}
button {
  background: rgb(8, 110, 110);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}
</style>