<template>
  <div class="container">
    <table>
      <div
        v-for="cartPokemon of currentCartPokemon"
        v-bind:key="cartPokemon.id"
      >
      <tr>
        <th>名前</th>
        <th>覚える技</th>
        <th>数量</th>
      </tr>
        <tr>
          <th><img :src="cartPokemon.img" /><br />{{ cartPokemon.name }}</th>
          <th>
            <ul v-for="skill of cartPokemon.skill" v-bind:key="skill.name">
              <li>{{ skill }}</li>
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
.container {
  padding-top: 100px;
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
.container {
  font-size: 15px;
}
</style>
