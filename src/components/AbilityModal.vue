<template>
  <Teleport to="#teleport">
    <div v-if="isVisible" id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="toggleModal">&times;</span>
        <p>modall content</p>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
    setup() {
    const isVisible = ref(false);

    const toggleModal = () => {
      isVisible.value = !isVisible.value;
    };
    return {
      isVisible,
      toggleModal
    };
  }
});
</script>

<style></style>
