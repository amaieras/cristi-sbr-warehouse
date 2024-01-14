<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      nav
      prepend-avatar="https://scontent-lga3-1.xx.fbcdn.net/v/t1.18169-9/13343085_886252198153626_1065954281791792969_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=l47nIjUoSHYAX8CcjQi&_nc_ht=scontent-lga3-1.xx&oh=00_AfCSAITuqyzw3OgREJvvC-tkSjepbu5DZYiuSqweHz23TQ&oe=65CBB0D2"
      title="Cristi Sbera"
    >
      <template #append>
        <v-btn
          color="primary"
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item :to="{ name: 'Home' }" prepend-icon="mdi-file-import" title="Importa date"
                   value="home"></v-list-item>
      <v-list-item :to="{ name: 'BatchesView' }" prepend-icon="mdi-file" title="Vezi date importate"
                   value="batch"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)
</script>


<style scoped>

</style>
