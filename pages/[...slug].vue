<script setup>
const intro = await useFetchIntro();

if (Object.keys(intro).length === 0) {
  await navigateTo();
}

useHead({
  title: intro.value.intro_title
})
</script>

<style></style>

<template>
  <NuxtLayout>
    <template #intro>
      <Intro
        :intro-image="intro.intro_image"
        :intro-title="intro.intro_title"
        :intro-text="intro.intro_text"
      />
    </template>

    <template #teaser>
      <Teaser v-if="intro.teaser" :teaser="intro.teaser" />
    </template>

    <ContactForm :intro-id="intro.id" />
  </NuxtLayout>
</template>
