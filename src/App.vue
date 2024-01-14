<template>
  <v-app>
    <AppNavigationDrawer />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppNavigationDrawer from '@/components/navigation/AppNavigationDrawer.vue'

</script>
<style scoped>
</style>
