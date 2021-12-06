<template>
  <div class="body">
    <div v-for="page of pageArray" v-bind:key="page">
      <button type="button" class="button">{{ page }}</button>
    </div>
    <br /><br />
    <div v-for="pokemon of pokemonList" v-bind:key="pokemon.id" class="pokemon">
      <table>
        <tr>
          <td colspan="2" class="imgtd">
            <router-link v-bind:to="'/pokemonDetail/' + pokemon.id">
              <img :src="pokemon.img" class="img" />
            </router-link>
          </td>
        </tr>
        <tr>
          <th>ID：</th>
          <td>{{ pokemon.id }}</td>
        </tr>
        <tr>
          <th>名前：</th>
          <td>{{ pokemon.name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Pokemon } from "@/types/pokemon";
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    let pokemonList = ref(new Array<Pokemon>());
    let totalPokemonCount = ref(0);
    let pageArray = ref(new Array<number>());
    // let displayPokemons = ref(new Array<Pokemon>());
    const store = useStore();
    // ポケモン情報取得
    let getPokemon = async () => {
      await store.dispatch("getPokemonList");
      pokemonList.value = store.getters.getPokemons;
    };
    getPokemon();
    // 合計のポケモン取得
    totalPokemonCount.value = store.getters.getTotalCount;

    // ページ数でボタン表示
    let maxpagenumber = Math.floor(totalPokemonCount.value / 100 + 1);
    if (totalPokemonCount.value % 100 === 0) {
      maxpagenumber -= 1;
    }
    for (let i = 1; i <= maxpagenumber; i++) {
      pageArray.value.push(i);
    }
    // // 初期のポケモン一覧
    // for (let i = 1; i <= 100; i++) {
    //   displayPokemons.value.push(pokemonList.value[i]);
    // }
    // pokemonList.value = displayPokemons.value;

    // // let onPageButtunClick = (page: number) => {
    // //   pokemonList.value = store.getters.getpokemons.slice(
    // //     page * 100 - 100,
    // //     page * 100
    // //   );
    // // };

    return { pokemonList, totalPokemonCount, pageArray };
  },
});
</script>

<style scoped>
td,
th {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  border: solid;
  width: 150px;
  text-align: center;
}
.pokemon {
  float: left;
}
.login-page {
  width: 600px;
}

.login-btn {
  text-align: center;
}
.img {
  width: 200px;
}
.button {
  float: left;
  text-align: center;
}
.body {
  padding-top: 100px;
}
</style>
