<!-- eslint-disable prettier/prettier -->
<template>
    <NavBar />
    <div class="rounded mt-10 mx-7" style="display: flex; justify-content: center">
        <RankingWeekly />
        <RankingByMachine />
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import NavBar from "@/components/NavBar.vue"

import RankingWeekly from "@/components/RankingWeekly.vue"
import RankingByMachine from "@/components/RankingByMachine.vue"
export default {
    name: 'RankingUser',
    components: { RankingWeekly, RankingByMachine,NavBar },
};
</script>
