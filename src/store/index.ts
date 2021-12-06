import { createStore } from "vuex";
import axios from "axios";
import { Pokemon } from "@/types/pokemon";
export default createStore({
  strict: true,
  state: {
    totalPokemons: 100,
    pokemons: new Array<Pokemon>(),
    PokemonList: new Array<Pokemon>(),
    currentPokemonId: 0,
  },
  mutations: {
    async showPokemonList(state, payload) {
      state.totalPokemons = payload.id;
      state.pokemons.push(
        new Pokemon(
          payload.id,
          payload.forms[0].name,
          payload.sprites.front_default
        )
      );
    },
    currentPokemonId(state, payload) {
      state.currentPokemonId = payload.id;
    },
  },
  actions: {
    /**
     *外部APIから商品情報を取得する.
     * @param context - コンテクスト
     */
    async getPokemonList(context) {
      for (let i = 1; i <= 100; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i}/`
        );
        const payload = response.data;
        context.commit("showPokemonList", payload);
      }
    },
  },
  getters: {
    getPokemons(state) {
      return state.pokemons;
    },
    getTotalCount(state) {
      return state.totalPokemons;
    },
  },
  modules: {},
});
