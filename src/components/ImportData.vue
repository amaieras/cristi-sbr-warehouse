<template>
  <v-container>
    <v-file-input
      v-model="selectedFile"
      :disabled="loadingImport"
      accept=".xls, .xlsx"
      label="Alege fisierul xlsx"
      @change="handleFileUpload"
    ></v-file-input>

    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="tableData"
      :items-per-page="100"
      class="elevation-1"
      fixed-header
      height="calc(100vh - 230px)"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Import fisier in baza de date</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-btn
            :disabled="tableData.length === 0"
            :loading="loadingImport"
            class="mb-2"
            color="primary"
            dark
            @click="importFileToFirestore"
          >
            Importa
          </v-btn>
        </v-toolbar>

      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { addDoc, collection } from 'firebase/firestore'
import { batchesRef } from '@/plugins/firebase'

const tableData: any = ref([])
const headers: any = ref()
const selectedFile: any = ref(null)

const parseXLSXData = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result as any)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

    // Extract headers dynamically
    headers.value = jsonData[0].map(h => {
      return {
        title: h,
        key: h,
        sortable: true,
        align: 'start'
      }
    })
    // Data starts from the second row
    tableData.value = jsonData.slice(1).filter((row: any) => row.length > 0).map((row: any) => {
      const obj = {}
      headers.value.forEach((header: any, index: any) => {
        obj[header.key] = row[index]
      })
      return obj
    })
  }
  if (file instanceof File) {
    reader.readAsArrayBuffer(file)
  } else {
    alert('Formatul fisierului este incorect, alege un fisier cu extensia .xls sau .xlsx')
  }
}

const handleFileUpload = () => {
  if (selectedFile.value) {
    parseXLSXData(selectedFile.value[0])
  }
}
const loadingImport = ref(false)

const importFileToFirestore = async () => {
  const batchId = new Date().getTime().toString()
  try {
    loadingImport.value = true
    // Additional fields for the document
    const batchDocumentData: any = {
      id: batchId,
      name: batchId
    }

    // Add the document with additional fields
    const batchDocumentRef = await addDoc(batchesRef, batchDocumentData)

    // Reference to the "phones" collection under the newly added document
    const phonesCollectionRef = collection(batchDocumentRef, 'phones')

    // Add phones to the "phones" collection
    await Promise.all(
      tableData.value.map(async (phoneObject) => {
        await addDoc(phonesCollectionRef, phoneObject)
      })
    )
  } catch (err) {
    console.log('Error importing data: ' + err)
  } finally {
    loadingImport.value = false
  }
}

</script>

<style scoped>

</style>
