<script setup>
import MainCard from './MainCard.vue'

defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorite', 'addToCart', 'addToComparison']) // Добавили новое событие
</script>

<template>
  <div class="grid grid-cols-4 gap-5 items-stretch" v-auto-animate>
    <MainCard
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :size="item.size"
      :material="item.material"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickCompare="() => emit('addToComparison', item.id)"
      :isFavorite="item.isFavorite"
      :is-added="item.isAdded"
    />
  </div>
</template>
