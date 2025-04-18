<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeCartItem } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price + ' руб.'"
      :image-url="item.imageUrl"
      :remove-cart-item="() => removeCartItem(item)"
    />
  </div>
</template>

<style scoped></style>
