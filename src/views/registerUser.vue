<template>
  <div>
    アドレス
    <input type="text" v-model="email" />
    名前
    <input type="text" v-model="name" />
    パスワード
    <input type="password" v-model="pass" />
    <button type="button" @click="onclick">登録</button>
  </div>
</template>

<script>
import router from "@/router";
import { defineComponent, ref } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  setup() {
    let email = ref("");
    let name = ref("");
    let pass = ref("");

    let onclick = async () => {
      const response = await axios.post("https://api-rks.herokuapp.com/register", {
        email: email.value,
        name: name.value,
        pass: pass.value,
      });
      console.log(response.data);
      if (response.data.status === "success") {
        router.push("/");
      }
    };
    return { name, pass, email, onclick };
  },
});
</script>

<style scoped></style>
