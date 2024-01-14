<template>
  <v-data-table
    :headers="headers"
    :items="batches"
    :loading="loadingData"
  >
    <template #item.title="{ item }">
      <div class="link-title" @click="goToBatch(item)">
        {{ item.title }}
        <v-icon class="ml-1" size="x-small">mdi-open-in-app</v-icon>
      </div>
    </template>
    <template #loading>
      Se incarca lista de loturi
    </template>
    <template #no-data>
      Nici un lot adaugat
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { collectionGroup, getDocs, query } from 'firebase/firestore'
import { db } from '@/plugins/firebase'
import { ref } from 'vue'
import { format } from 'date-fns'
import { useRouter } from 'vue-router'

const batches = ref([])
const headers = [
  {
    title: 'Nume Lot',
    key: 'title'
  },
  {
    title: 'Data Adaugarii',
    key: 'date'
  },
  {
    title: 'Actiuni',
    key: 'actions',
    sortable: false
  }
]
const router = useRouter()

const loadingData = ref(false)
const getBatches = async () => {
  try {
    loadingData.value = true
    const batchesCollection = query(collectionGroup(db, 'batches'))
    const querySnapshot = await getDocs(batchesCollection)
    batches.value = querySnapshot.docs.map((doc) => {
      const batchId = parseInt(doc.data().id)
      const batchName = doc.data().name
      return {
        id: doc.id,
        title: batchName,
        date: format(new Date(batchId), 'dd/MMM/yyyy')
      }
    })
  } catch (error) {
    console.error('Error getting batches:', error)
  } finally {
    loadingData.value = false
  }
}
const goToBatch = (batch) => {
  router.push({ name: 'BatchView', params: { id: batch.id } })
}
getBatches()
</script>

<style lang="scss" scoped>
.link-title {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: rgb(var(--v-theme-primary));
    text-decoration: underline;
  }
}
</style>
