<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  removeCartItem: Function,
})
</script>

<template>
  <div class="flex border border-slate-100 p-4 rounded-xl gap-4">
    <img class="size-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col">
      <p>{{ title }}</p>
      <div class="flex justify-between">
        <b>{{ price }}</b>
        <img
          @click="removeCartItem"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
        />
      </div>
    </div>
  </div>
</template>
