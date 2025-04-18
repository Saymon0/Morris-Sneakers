<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
  onClickCompare: Function,
  size: Number,
  material: String,
})
</script>

<template>
  <div
    class="relative flex flex-col bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl h-full"
  >
    <img
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="absolute top-8 left-8 w-13 p-2 hover:bg-gray-100 rounded-full"
      @click="onClickFavorite"
    />

    <div class="flex-grow">
      <img :src="imageUrl" alt="Sneaker" class="w-full h-48 object-contain mb-4" />

      <p class="text-lg font-semibold min-h-[3rem] line-clamp-2">{{ title }}</p>

      <!-- Блок с характеристиками -->
      <div class="mt-2 space-y-1">
        <div class="flex items-center text-sm text-gray-500">
          <span class="mr-2">Размер:</span>
          <span class="font-medium">{{ size }}</span>
        </div>
        <div class="flex items-center text-sm text-gray-500">
          <span class="mr-2">Материал:</span>
          <span class="font-medium line-clamp-1">{{ material }}</span>
        </div>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div class="flex flex-col">
          <span class="text-slate-400 text-sm">Цена:</span>
          <b class="text-lg">{{ price }} руб. </b>
        </div>
        <button @click="onClickAdd" class="p-2 hover:bg-gray-100 rounded-full">
          <img
            :src="!isAdded ? '/plus.svg' : '/checked.svg'"
            alt="Cart"
            class="w-8 cursor-pointer"
          />
        </button>
      </div>
    </div>

    <button
      @click="onClickCompare"
      class="mt-4 w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors cursor-pointer"
    >
      Сравнить
    </button>
  </div>
</template>
