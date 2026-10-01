<template>
  <section class="hero">
    <img
      src="/hero-fespati.jpg"
      alt="FESPATI Kota Depok"
      class="hero-img"
      width="1080"
      height="402"
      fetchpriority="high"
    />
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  width: 100%;
}

.hero-img {
  display: block;
  width: 100%;
  max-width: 1080px;
  height: auto;
  margin-inline: auto;
}
</style>
