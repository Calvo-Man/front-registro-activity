<!-- eslint-disable prettier/prettier -->
<template>
    <v-card
      class="mx-5 bg-indigo-darken-4"
      height="300"
      prepend-icon="mdi-music"
      subtitle="The best music reproductor"
      width="700"
    >
      <template #title>
        <span class="font-weight-black text-blue-lighten-4"
          >Welcome to our gym</span
        >
      </template>

      <v-card-text class="pt-4 text-center text-blue-lighten-4 text-subtitle-1">
        To enjoy the best experience in this amazing app you need to login.
      </v-card-text>
      <v-card-text class="pt-4 text-center text-blue-lighten-4 text-subtitle-1">
        If you don't have any account you can register by clicking
        <a href="/register" rel="noopener">here</a>.
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <RouterLink v-slot="{ navigate }" custom to="/login">
          <v-btn
            class="mx-2 text-blue-lighten-1 bg-black"
            prepend-icon="mdi-login"
            variant="elevated"
            @click="navigate"
          >
            Sing in
          </v-btn>
        </RouterLink>

        <RouterLink v-slot="{ navigate }" custom to="/register">
          <v-btn
            class="mx-2 text-blue-lighten-4 bg-black"
            prepend-icon="mdi-account-plus"
            variant="elevated"
            @click="navigate"
          >
            Register
          </v-btn>
        </RouterLink>
      </v-card-actions>
    </v-card>
</template>
