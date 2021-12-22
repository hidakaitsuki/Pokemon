<template>
  <div class="container">
    <table>
      <div
        v-for="cartPokemon of currentCartPokemon"
        v-bind:key="cartPokemon.id"
      >
      <tr>
        <th>名前</th>
        <th>持ち物</th>
        <th>数量</th>
      </tr>
        <tr>
          <th><img :src="cartPokemon.img" /><br />{{ cartPokemon.name }}</th>
          <th>
            <ul v-for="item of cartPokemon.item" v-bind:key="item.name">
              <li>{{ item }}</li>
            </ul>
          </th>
          <th>{{ cartPokemon.quantity }}</th>
        </tr>
      </div>
    </table>
  </div>
</template>
<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    // カート内のポケモン
    let currentCartPokemon = ref([]);
    // ストアからカート内のポケモンを取得
    currentCartPokemon.value = store.getters.getCartPokemons;

    return { currentCartPokemon };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c");

.container {
  font-family: "M PLUS Rounded 1c", sans-serif;
  padding-top: 100px;
  background-image: url(../../public/FAOSXgkVgAQoyQH.jpeg);
  background-size: 80%;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.89);
  background-blend-mode: lighten;
  background-position: center;
  background-position: 50% -13pt;
  background-attachment: fixed;
  text-align: center;
}
th,
tr,
td {
  width: 1000px;
  text-align: center;
}
img {
  height: 150px;
}
</style>
