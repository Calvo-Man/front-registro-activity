<!-- eslint-disable prettier/prettier -->
<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
    name: "App",
    components: { HelloWorld },
};
</script>
<!-- eslint-disable prettier/prettier -->
<template>
    <img
    alt="Vue logo"
    class="logo m-4"
    height="125"
    src="@/assets/logo-vue.png"
    width="125"
    />
    <header>
        <HelloWorld />
        <RouterView />
    </header>
</template>
<!-- eslint-disable prettier/prettier -->
<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 20%;
  }

  header {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }


}
</style>
