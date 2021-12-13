<template>
  <Header></Header>
  <div class="headerheight"></div>
  <router-view></router-view><br>
  <Footer></Footer>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer.vue";
export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>
<style>
.headerheight {
  height: 100px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
