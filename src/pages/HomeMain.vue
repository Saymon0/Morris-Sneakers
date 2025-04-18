<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'
import ProductComparison from '@/components/ProductComparison.vue'
import axios from 'axios'

const { cart, removeCartItem } = inject('cart')

const items = ref([])
const comparison = ref(null)

const addToComparison = (productId) => {
  comparison.value.addToComparison(productId)
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const addCartItem = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const cartItemToggle = (item) => {
  if (!item.isAdded) {
    addCartItem(item)
  } else {
    removeCartItem(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = { ...item, isFavorite: true, favoriteId: item.id }
      const { data } = await axios.post('https://f45bb7cdceaa1ea9.mokky.dev/favorites', obj)
      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      await axios.delete(`https://f45bb7cdceaa1ea9.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://f45bb7cdceaa1ea9.mokky.dev/favorites')

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.favoriteId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://f45bb7cdceaa1ea9.mokky.dev/items', { params })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-10">Все кроссовки</h2>

    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none"
        name=""
        id=""
      >
        <option value="name">По названию</option>

        <option value="price">По цене (дешевые)</option>

        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute left-3 top-3" src="/search.svg" alt="search" />
        <input
          @input="onChangeSearchInput"
          type="text"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск . . ."
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList
      :items="items"
      @add-to-favorite="addToFavorite"
      @add-to-cart="cartItemToggle"
      @add-to-comparison="addToComparison"
    />
  </div>
  <ProductComparison ref="comparison" :products="items" class="mt-12" />
</template>

<style scoped></style>
