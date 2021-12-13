<template>
  <div class="container">
    <img :src="currentPokemon.img" />
    <h1>{{ currentPokemon.name }}</h1>
    {{ pokemonText }}
    <table class="detail">
      <tr>
        <th>ID：</th>
        <td>
          {{ currentPokemon.id }}
        </td>
      </tr>
      <tr>
        <th>タイプ：</th>
        <td v-for="type of currentPokemon.type" v-bind:key="type.typeName">
          {{ type.typeName }}
        </td>
      </tr>
      <tr>
        <th>特性：</th>
        <td
          v-for="ability of currentPokemon.ability"
          v-bind:key="ability.abilityName"
        >
          {{ ability.abilityName }}
        </td>
      </tr>
    </table>

    <table class="status">
      <h3>種族値</h3>
      <tr>
        <th>体力</th>
        <td>{{ currentPokemon.status.hp }}</td>
      </tr>
      <tr>
        <th>攻撃力</th>
        <td>{{ currentPokemon.status.attack }}</td>
      </tr>
      <tr>
        <th>防御力</th>
        <td>{{ currentPokemon.status.block }}</td>
      </tr>
      <tr>
        <th>特攻</th>
        <td>{{ currentPokemon.status.critical }}</td>
      </tr>
      <tr>
        <th>特防</th>
        <td>{{ currentPokemon.status.deffence }}</td>
      </tr>
      <tr>
        <th>素早さ</th>
        <td>{{ currentPokemon.status.speed }}</td>
      </tr>
    </table>

    <table class="skill">
      <tr>
        <td colspan="3">
          <h3>覚える技</h3>
        </td>
      </tr>
      <tr>
        <th></th>
        <th>技名</th>
        <th>効果</th>
      </tr>
      <tr v-for="skill of currentPokemon.skill" v-bind:key="skill.skillName">
        <td>
          <label>
            <input
              type="checkbox"
              v-bind:value="skill.skillName"
              v-model="skills"
            />
            <span></span>
          </label>
        </td>
        <td>
          {{ skill.skillName }}
        </td>
        <td>{{ skill.skillUrl }}</td>
      </tr>
    </table>
    <select
      class="browser-default"
      v-model.number="quantity"
    >
      <option value="" disabled selected>選択して下さい</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
    </select>
    <span class="error"> {{ skillError }}</span
    ><br />
    <span class="error"> {{ quantityError }}</span
    ><br />

    <button type="button" @click="onClickAddCart()">カートに追加する</button>
  </div>
</template>

<script>
import { Ability } from "@/types/ability";
import { PokemonDetail } from "@/types/pokemonDetail";
import { Skill } from "@/types/skill";
import { Status } from "@/types/status";
import { Type } from "@/types/type";
import { defineComponent, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const route = useRoute();
    // ルーターからID取得
    const pokemonId = ref(parseInt(route.params.id));
    // 名前
    const currentName = ref("");
    // タイプ
    const currentTypes = ref([]);
    // 特性
    const currentAbility = ref([]);
    // 技
    const currentSkill = ref([]);
    // ステータス
    const currentStatus = ref("");
    // 現在のポケモンのクラス
    let currentPokemon = ref("");
    // ポケモンの説明文
    let pokemonText = ref("");
    // 選択した技
    let skills = ref([]);
    // スキルのエラー
    let skillError = ref("");
    // 数量;
    let quantity = ref(0);
    // 数量のエラー
    let quantityError = ref("");
    // エラーの保持の有無
    let hasError = ref("");
    const store = useStore();
    const router = useRouter();
    // 今のIDからポケモンの情報を取得
    const getCurrentPokemon = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`
      );

      //   日本語の名前に変更
      const nameResponse = await axios.get(response.data.species.url);
      currentName.value = nameResponse.data.names.filter(
        (name) => name.language.name === "ja"
      )[0].name;
      //   日本語の説明文を取得
      pokemonText.value = nameResponse.data.flavor_text_entries.filter(
        (text) => text.language.name === "ja"
      )[0].flavor_text;

      //   タイプの配列
      for (let types of response.data.types) {
        const typeResponse = await axios.get(types.type.url);
        currentTypes.value.push(
          new Type(
            //   日本語のタイプに変更
            typeResponse.data.names.filter(
              (type) => type.language.name === "ja-Hrkt"
            )[0].name,
            types.type.url
          )
        );
      }

      //   特性の配列
      for (let abilities of response.data.abilities) {
        const abilityResponse = await axios.get(abilities.ability.url);
        currentAbility.value.push(
          new Ability(
            //   日本語の特性に変更
            abilityResponse.data.names.filter(
              (ability) => ability.language.name === "ja-Hrkt"
            )[0].name,
            abilities.ability.url
          )
        );
      }

      //   技の配列
      for (let skill of response.data.moves) {
        const response =await axios.get(skill.move.url);

        currentSkill.value.push(
          new Skill(
            //   日本語の技名に変更
            response.data.names.filter(
              (skill) => skill.language.name === "ja"
            )[0].name,
            // 日本語の技の説明に変更
            response.data.flavor_text_entries.filter(
              (text) => text.language.name === "ja"
            )[0].flavor_text
          )
        );
      }
      //  ステータス
      currentStatus.value = new Status(
        response.data.stats[0].base_stat,
        response.data.stats[1].base_stat,
        response.data.stats[2].base_stat,
        response.data.stats[3].base_stat,
        response.data.stats[4].base_stat,
        response.data.stats[5].base_stat
      );
      //   ポケモン詳細のクラス作成
      currentPokemon.value = new PokemonDetail(
        response.data.id,
        currentName,
        currentTypes,
        currentAbility,
        currentSkill,
        currentStatus,
        response.data.sprites.front_default
      );
    };

    let onClickAddCart = () => {
      skillError.value = "";
      quantityError.value = "";
      hasError.value = false;
      if (skills.value.length === 0) {
        skillError.value = "技を選択してください";
        hasError.value = true;
      } else if (skills.value.length > 4) {
        skillError.value = "技は4つ以内で選択してください";
        hasError.value = true;
      }
      if (quantity.value === 0) {
        quantityError.value = "数量を選択してください";
        hasError.value = true;
      }
      if (hasError.value === true) {
        return;
      }
      store.commit("addPokemonCart", {
        id: currentPokemon.value.id,
        name: currentPokemon.value.name,
        img: currentPokemon.value.img,
        skill: skills,
        quantity: quantity.value,
      });
      router.push("/cartList");
    };
    getCurrentPokemon();
    return {
      currentPokemon,
      pokemonText,
      onClickAddCart,
      skills,
      quantity,
      skillError,
      quantityError,
    };
  },
});
</script>

<style scoped>
.container {
  text-align: center;
}
img {
  height: 300px;
  /* 画像と名前を近づける */
  margin-bottom: -50px;
}
.status {
  float: right;
  width: 200px;
  margin-top: -500px;
  margin-left: 100px;
}
.detail {
  width: 500px;
}
.error {
  color: red;
}
.detail {
  align-content: center;
  margin-left: 300px;
}
</style>
