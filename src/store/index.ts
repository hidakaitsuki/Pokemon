import { createStore } from "vuex";
import axios from "axios";
import { Pokemon } from "@/types/pokemon";
import { OrderPokemon } from "@/types/orderPokemon";
export default createStore({
  strict: true,
  state: {
    totalPokemons: 898,
    pokemons: new Array<Pokemon>(),
    currentPokemonId: 0,
    cartPokemons: new Array<OrderPokemon>(),
    isLogin: false,
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    async showPokemonList(state, payload) {
      state.totalPokemons = payload.id;
      state.pokemons.push(
        new Pokemon(
          payload.info.id,
          payload.name.names[0].name,
          payload.info.sprites.front_default,
          payload.type
        )
      );
    },
    currentPokemonId(state, payload) {
      state.currentPokemonId = payload.id;
    },
    // ページを開き直すたびに追加されないようにする
    resetPokemons(state) {
      state.pokemons = new Array<Pokemon>();
    },
    addPokemonCart(state, payload) {
      state.cartPokemons.push(
        new OrderPokemon(
          payload.id,
          payload.name,
          payload.img,
          payload.item,
          payload.quantity
        )
      );
    },
  },
  actions: {
    /**
     *外部APIから商品情報を取得する.
     * @param context - コンテクスト
     */
    async getPokemonList(context) {
      for (let i = 1; i <= 898; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i}/`
        );
        // 名前を日本語にする
        const responseName = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${i}/`
        );
        const typeArray = [];
        // 日本語のタイプを取得
        for (const types of response.data.types) {
          const responseType = await axios.get(types.type.url);
          typeArray.push(responseType.data.names[0].name);
        }
        const name = responseName.data;
        const payload = response.data;
        context.commit("showPokemonList", {
          info: payload,
          name: name,
          type: typeArray,
        });
      }
    },
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getPokemons(state) {
      return state.pokemons;
    },
    getTotalCount(state) {
      return state.totalPokemons;
    },
    getCartPokemons(state) {
      return state.cartPokemons;
    },
  },
  modules: {},
});
