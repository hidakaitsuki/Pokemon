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
    <table>
      <tr>
        <td colspan="2">
          <h3>覚える技</h3>
        </td>
      </tr>
      <tr>
        <th>技名</th>
        <th>効果</th>
      </tr>
      <tr v-for="skill of currentPokemon.skill" v-bind:key="skill.skillName">
        <td>
          {{ skill.skillName }}
        </td>
        <td>{{ skill.skillUrl }}</td>
      </tr>
    </table>
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
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    // ルーターからID取得
    const pokemonId = ref(parseInt(route.params.id));
    const currentName = ref("");
    const currentTypes = ref([]);
    const currentAbility = ref([]);
    const currentSkill = ref([]);
    const currentStatus = ref("");
    let currentPokemon = ref("");
    let pokemonText = ref("");
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
      for (let ability of response.data.abilities) {
        const abilityResponse = await axios.get(ability.ability.url);
        currentAbility.value.push(
          new Ability(
            //   日本語の特性に変更
            abilityResponse.data.names.filter(
              (ability) => ability.language.name === "ja-Hrkt"
            )[0].name,
            ability.url
          )
        );
      }

      //   技の配列
      for (let skill of response.data.moves) {
        const response = await axios.get(skill.move.url);

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
      const responseText = await axios.get(response.data.species.url);

      //   ポケモンの説明文を日本語に変更
      pokemonText.value = responseText.data.flavor_text_entries.filter(
        (text) => text.language.name === "ja"
      )[0].flavor_text;
    };
    getCurrentPokemon();
    return { currentPokemon, pokemonText };
  },
});
</script>

<style scoped>
.container {
  padding-top: 100px;
  text-align: center;
}
img {
  height: 300px;
  /* 画像と名前を近づける */
  margin-bottom: -50px;
}
.status {
  float: left;
  width: 200px;
}
.detail {
  width: 500px;
}
</style>
