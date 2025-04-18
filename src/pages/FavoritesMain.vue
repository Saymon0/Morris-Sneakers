<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://f45bb7cdceaa1ea9.mokky.dev/favorites')
    favorites.value = data
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <div class="mt-10">
    <CardList :items="favorites" />
  </div>
</template>
