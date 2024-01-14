<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="batchData"
      :items-per-page="100"
      :loading="loading"
      class="elevation-1"
      fixed-header
      height="calc(100vh - 130px)"
    >
      <template #loading>
        Se incarca lista de telefoane
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { db } from '@/plugins/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ref } from 'vue'

const route = useRoute()
const headers = ref([])
const batchData = ref([])
const loading = ref(false)
const getBatchData = async () => {
  try {
    loading.value = true
    const collectionRef = collection(db, 'batches/' + route.params.id + '/phones')
    const querySnapshot = await getDocs(collectionRef)
    headers.value = Object.keys(querySnapshot.docs[0]?.data()).map(h => {
      return {
        title: h,
        key: h,
        sortable: true,
        align: 'start'
      }
    })
    querySnapshot.forEach((doc) => {
      batchData.value.push(doc.data())
    })
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }

}
getBatchData()
</script>

<style scoped>

</style>
