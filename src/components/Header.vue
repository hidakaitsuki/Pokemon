<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <img src="/67872373.png" class="logo" />
        </div>
        <div class="title">ポケモン図鑑</div>
        <div class="header-right">
          <router-link to="/">TOP</router-link>
          <router-link to="/registerUser">会員登録</router-link>
          <router-link to="/cartList">
            <i class="fas fa-shopping-cart"> </i>カート
          </router-link>
          <router-link to="/login" v-if="!isLogin">
            <i class="fas fa-sign-in-alt"></i>ログイン
          </router-link>
          <router-link to="/logout" v-if="isLogin">
            <i class="fas fa-sign-in-alt"></i>ログアウト
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";
export default defineComponent({
  props: {},
  setup() {
    const isLogin = computed(() => {
      return store.getters.getIsLogin;
    });

    return {
      isLogin,
    };
  },
});
</script>

<style scoped>
header {
  font-family: "M PLUS Rounded 1c", sans-serif;
  font-weight: 900;
  height: 100px;
  width: 100%;
  background-color: rgba(255, 255, 255);
  position: fixed; /* スクロールしてもヘッダが表示されるように位置を固定する */
  z-index: 10; /* ヘッダが一番上に表示されるようにする(数が多いほど上に来る。例えば-1にするとヘッダが裏側に行き見えなくなります) */
  opacity: 0.9;
}

.header {
  display: flex; /* ヘッダロゴと右側のリンクを横並びにする */
  justify-content: space-between;
  align-items: center;
  font-size: 100px;
}
header {
  width: 100%;
  background-color: turquoise;
}
.logo {
  width: 165px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.title{
  color: aliceblue;
  position: absolute;
  top: -10px;
  font-size:80px;
}
.header-right {
  display: flex; /* ヘッダ右側のリンクを横に並べる */
  position: absolute;
  right: 0px;
  top: 0px;
}

.header-right a {
  line-height: 100px; /* 行の高さを指定(文字が上下の真ん中に配置される) */
  padding: 0 25px;
  color: gray;
  font-size: 1.3rem;
  display: block; /* a要素をブロック要素に変更(borderまでがクリックできるようになる) */
  transition: all 0.5s; /* アニメーションの設定 all=変化の対象 0.5s=変化にかかる時間 hoverと組み合わせることが多い */
}

.header-right a:hover {
  color: #000;
  text-decoration: underline;
}

/* fontawesome(カートアイコン＆ログインアイコンの設定) */
.fas {
  margin-right: 5px;
}

.profile-img {
  width: 50px;
  height: 50px;
  margin-top: 20px;
}

/* スマートフォン用のメニューアイコン */
.menu-icon {
  display: none; /* メディアクエリで画面がスマホサイズになるまでは非表示 */
  color: gray;
  float: right;
  font-size: 25px;
  padding: 21px 0;
}
</style>
