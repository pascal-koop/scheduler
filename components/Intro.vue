<script setup>
const props = defineProps(["introImage", "introTitle", "introText"]);
const imageUrl = computed(() => `/image/${props.introImage}`);
const backgroundImageUrl = computed(() => `url("${imageUrl.value}")`);
</script>

<template>
  <section class="intro" :style="{ 'background-image': backgroundImageUrl }">
    <div class="intro-inner">
      <h2 class="intro-title">{{ props.introTitle }}</h2>
      <p class="intro-content">{{ props.introText }}</p>
      <div class="arrow-down"></div>
    </div>
  </section>
</template>
