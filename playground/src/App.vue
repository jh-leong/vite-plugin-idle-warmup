<script setup lang="ts">
import { createApp } from 'vue';

async function loadFoo() {
  import('./foo');

  const barComp = await import('./BarComp.vue');
  createApp(barComp.default).mount('#bar');
}
</script>

<template>
  <div
    class="h-[100vh] flex flex-col items-center justify-center font-bold text-[33px]"
    @click="loadFoo"
  >
    Hello word! Click me to load modules.
    <div class="">
      <div id="bar"></div>
    </div>
  </div>
</template>

<style scoped></style>
