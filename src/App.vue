<template>
  <v-app class="bg-color">
    <RouterView />
  </v-app>
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 20%;
  }
  .bg-color {
    background-image: linear-gradient(to bottom, #020818, #2155b6);
  }
  header {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
