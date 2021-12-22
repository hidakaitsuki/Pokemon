<template>
  アドレス
  <input type="text" v-model="address" />
  パスワード
  <input type="text" v-model="pass" />
  <button type="button" @click="onclick()">ログイン</button>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import { defineComponent, ref } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  setup() {
    let address = ref("");
    let pass = ref("");
    let onclick = async () => {
      const response = await axios.post("https://api-rks.herokuapp.com/login", {
        email: address.value,
        pass: pass.value,
      });
      console.log(response.data);
      if (response.data.status === "success") {
        store.commit("login");
        router.push("/");
      }
    };
    return { address, pass, onclick };
  },
});
</script>

<style scoped></style>
