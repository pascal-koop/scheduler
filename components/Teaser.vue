<script setup>
defineProps(["teaser"]);
</script>

<style></style>

<template>
  <section class="teaser">
    <p class="teaser-content">{{ $props.teaser }}</p>
  </section>
</template>
