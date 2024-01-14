<template>
  <v-app-bar
    color="primary"
    density="compact"
  >
    <template v-slot:prepend>
      <v-btn v-if="route.name !== 'BatchesView'" @click="goBack">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>

    <v-app-bar-title>Lista Loturi</v-app-bar-title>

  </v-app-bar>
  <router-view />
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.push({
    name: 'BatchesView'
  })
}
</script>

<style scoped>

</style>
