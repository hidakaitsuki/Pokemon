<template>
  <span>ログアウト中</span>
</template>

<script>
import router from "@/router";
import store from "@/store";
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  setup() {
    let logout = async () => {
      const response = await axios.post("https://api-rks.herokuapp.com/logout");
      console.log(response.data);
      store.commit("logout");
      router.push("/");
    };
    logout();
  },
});
</script>

<style></style>
