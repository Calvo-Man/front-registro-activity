<!-- eslint-disable prettier/prettier -->
<template>
    <NavBar />
    <div class="rounded mt-10 mx-7" style="display: flex; justify-content: center">
       <RankingTopThree />
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
 <script>
import NavBar from '@/components/NavBar.vue';
import RankingTopThree from '@/components/RankingTopThree.vue';

export default {
    name: 'RankingGlobal',
    components: { RankingTopThree, NavBar },
};
</script>