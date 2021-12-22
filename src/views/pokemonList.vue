<template>
  <div class="body">
    <input type="text" v-model="searchName" class="namesearch" />
    <button type="button" @click="searchByName()" class="btn-gradient-radius">
      名前で検索
    </button>
    <div class="search">
      <button
        type="button"
        class="btn-gradient-3d-simple"
        v-on:click="onPageButtunClick(page)"
        v-for="page of pageArray"
        v-bind:key="page"
      >
        第 {{ page }}世代
      </button>
      <br />
      <button
        type="button"
        v-for="type of typeArray"
        v-bind:key="type"
        @click="searchType(type)"
        class="btn-top-radius"
      >
        {{ type }}</button
      ><br />
    </div>
    <div v-for="pokemon of pokemonList" v-bind:key="pokemon.id" class="pokemon">
      <table class="list">
        <tr>
          <td colspan="2" class="imgtd">
            <span class="number"> No.{{ pokemon.id }}</span
            ><br />
            <router-link v-bind:to="'/pokemonDetail/' + pokemon.id">
              <img :src="pokemon.img" class="img" />
            </router-link>
          </td>
        </tr>
        <tr>
          <td>{{ pokemon.name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Pokemon } from "@/types/pokemon";
import { defineComponent, ref } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    let typeArray = [
      "ノーマル",
      "ほのお",
      "みず",
      "でんき",
      "くさ",
      "こおり",
      "かくとう",
      "どく",
      "じめん",
      "ひこう",
      "エスパー",
      "むし",
      "いわ",
      "ゴースト",
      "ドラゴン",
      "あく",
      "はがね",
      "フェアリー",
    ];
    let pokemonList = ref(new Array<Pokemon>());
    let totalPokemonCount = ref(0);
    let pageArray = ref(new Array<number>());
    let searchName = ref("");
    const store = useStore();
    // 初期のポケモン情報取得
    let getPokemon = async () => {
      store.commit("resetPokemons");
      store.dispatch("getPokemonList");
      pokemonList.value = store.getters.getPokemons;
      pokemonList.value.sort(function (a, b) {
        return a.id > b.id ? -1 : 1;
      });
      const response = await axios.post(
        "https://api-rks-generator.herokuapp.com/samples",
        {test:"test"}
      );
      console.log(response.data);
    };
    // let sortPokemon = () => {
    //   pokemonList.value = pokemonList.value.sort(function (a, b) {
    //     return a.id < b.id ? 1 : -1;
    //   });
    // };
    const sortPokemon = pokemonList.value.sort(function (a, b) {
      return a.id < b.id ? -1 : 1;
    });
    pokemonList.value = sortPokemon;

    // 名前で検索したポケモンのみ検索する
    let searchByName = () => {
      pokemonList.value = store.getters.getPokemons;
      pokemonList.value = pokemonList.value.filter(
        (pokemon) => pokemon.name.includes(searchName.value) === true
      );
      // 存在しなければ全件表示
      if (pokemonList.value.length === 0) {
        pokemonList.value = store.getters.getPokemons;
      }
    };
    getPokemon();

    // 合計のポケモン取得
    totalPokemonCount.value = 898;
    pageArray.value = [1, 2, 3, 4, 5, 6, 7, 8];
    // ページ数でボタン表示
    // let maxpagenumber = Math.floor(totalPokemonCount.value / 100 + 1);
    // if (totalPokemonCount.value % 100 === 0) {
    //   maxpagenumber -= 1;
    // }
    // for (let i = 1; i <= maxpagenumber; i++) {
    //   pageArray.value.push(i);
    // }

    // ページング処理（世代別）
    let onPageButtunClick = (page: number) => {
      pokemonList.value = store.getters.getPokemons;
      if (page === 1) {
        const slicePokemon = pokemonList.value.slice(0, 151);
        pokemonList.value = slicePokemon;
      }
      if (page === 2) {
        const slicePokemon = pokemonList.value.slice(151, 251);
        pokemonList.value = slicePokemon;
      }
      if (page === 3) {
        const slicePokemon = pokemonList.value.slice(251, 386);
        pokemonList.value = slicePokemon;
      }
      if (page === 4) {
        const slicePokemon = pokemonList.value.slice(386, 493);
        pokemonList.value = slicePokemon;
      }
      if (page === 5) {
        const slicePokemon = pokemonList.value.slice(493, 649);
        pokemonList.value = slicePokemon;
      }
      if (page === 6) {
        const slicePokemon = pokemonList.value.slice(649, 721);
        pokemonList.value = slicePokemon;
      }
      if (page === 7) {
        const slicePokemon = pokemonList.value.slice(721, 809);
        pokemonList.value = slicePokemon;
      }
      if (page === 8) {
        const slicePokemon = pokemonList.value.slice(809, 898);
        pokemonList.value = slicePokemon;
      }
    };
    // 2秒後に最初の100件のポケモンを表示する(読み込みに時間がかかるため)
    let firstpokemon = () => {
      const firstPokemon = pokemonList.value.slice(0, 151);
      pokemonList.value = firstPokemon;
    };
    let settime = () => {
      setTimeout(firstpokemon, 5000);
    };
    settime();

    let searchType = (searchType: string) => {
      // ストアのポケモンを呼びしてリセット
      pokemonList.value = store.getters.getPokemons;
      //  引数で受け取ったタイプで絞り込む
      const searchPokemon = pokemonList.value.filter(
        (pokemon) => pokemon.type.includes(searchType) === true
      );
      pokemonList.value = searchPokemon;
    };
    return {
      pokemonList,
      totalPokemonCount,
      pageArray,
      searchType,
      typeArray,
      onPageButtunClick,
      searchByName,
      searchName,
    };
  },
});
</script>

<style scoped>
td,
th {
  font-family: "M PLUS Rounded 1c", sans-serif;
  font-weight: 900;
  font-size: 20px;
  border: ridge;
  width: 100px;
  text-align: center;
}
.number {
  text-align: left;
  font-size: 20px;
  float: left;
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
  width: 150px;
}
.button {
  float: left;
  text-align: center;
}

table {
  margin-left: 50px;
  margin-right: auto;
  background-image: url(../../public/1867768.jpg);
}
.btn-top-radius {
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 8px 10px 5px 10px;
  text-decoration: none;
  color: #ffa000;
  background: #fff1da;
  border-bottom: solid 4px #ffa000;
  border-radius: 15px 15px 0 0;
  transition: 0.4s;
  width: auto;
}

.btn-top-radius:hover {
  background: #ffc25c;
  color: #fff;
}
.btn-gradient-3d-simple {
  font-family: "M PLUS Rounded 1c", sans-serif;
  font-weight: 900;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  color: #ffffff;
  background-image: linear-gradient(#6795fd 0%, #67ceff 100%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #5e7fca;
}

.btn-gradient-3d-simple:active {
  -webkit-transform: translateY(4px);
  transform: translateY(4px);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
  border-bottom: none;
}

.btn-gradient-radius {
  font-family: monospace;
  display: inline-block;
  padding: 7px 20px;
  border-radius: 25px;
  text-decoration: none;
  color: #fff;
  background-image: linear-gradient(45deg, #ffc107 0%, #ff8b5f 100%);
  transition: 0.4s;
}

.btn-gradient-radius:hover {
  background-image: linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
}
</style>
