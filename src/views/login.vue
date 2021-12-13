<template>
  <body>
    <fieldset>
      <h1>Login</h1>
      <form>
        <div class="iconUser"></div>
        <input type="text" placeholder="Username" required />
        <div class="iconPassword"></div>
        <input type="password" placeholder="Password" required />
        <input type="submit" value="Enter" />
      </form>
    </fieldset>
  </body>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    // let login = () => {
        
    
  },
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

body {
  font-family: "Open Sans", sans-serif;
  margin-top: 100px;
}
fieldset {
  width: 400px;
  margin: 0 auto;
  margin-bottom: 2%;
  transition: opacity 1s;
  -webkit-transition: opacity 1s;
}
h1 {
  background: #004a3e;
  padding: 20px 0; /*PADDING TODOS OS LADOS DE 20PX*/
  font-size: 140%;
  font-weight: 300;
  text-align: center;
  color: #fff;
}
form {
  background: #f0f0f0;
  padding: 6% 4%;
}
input[type="password"] {
  width: 76%;
  height: 20px;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  padding: 4% 4% 4% 4%;
  font-family: "Open Sans", sans-serif;
  font-size: 95%;
  color: #555;
}
.iconPassword {
  width: 20px;
  height: 20px;
  background-color: #004a3e;
  float: left;
  padding: 4% 4% 4% 4%;
  margin-bottom: 4%;
  background-repeat: no-repeat;
  background-image: url(https://cdn4.iconfinder.com/data/icons/font-awesome-2/2048/f09c-32.png);
  background-position: center;
  border: 1px solid #ccc;
}
.iconUser {
  width: 20px;
  height: 20px;
  background-color: #004a3e;
  float: left;
  padding: 4% 4% 4% 4%;
  margin-bottom: 4%;
  background-repeat: no-repeat;
  background-image: url(https://cdn4.iconfinder.com/data/icons/font-awesome-2/2048/f007-32.png);
  background-position: center;
  border: 1px solid #ccc;
}
input[type="text"] {
  width: 76%;
  height: 20px;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  padding: 4% 4% 4% 4%;
  font-family: "Open Sans", sans-serif;
  font-size: 95%;
  color: #555;
}
input[type="submit"] {
  width: 100%;
  background: #004a3e;
  border: 0;
  padding: 4%;
  font-family: "Open Sans", sans-serif;
  font-size: 100%;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-transition: background 0.3s;
}

input[type="submit"]:hover {
  background: #53b9a8;
}
::-webkit-input-placeholder {
}
</style>
