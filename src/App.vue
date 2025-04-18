<script setup>
import { computed, provide, ref, watch } from 'vue'
import MainHeader from './components/MainHeader.vue'
import AppDrawer from './components/AppDrawer.vue'

const cart = ref([])

const drawerOpen = ref(false)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const removeCartItem = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide('cart', { cart, openDrawer, closeDrawer, removeCartItem })
</script>

<template>
  <UApp>
    <AppDrawer :total-price="totalPrice" v-if="drawerOpen" />
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <MainHeader :total-price="totalPrice" @openDrawer="openDrawer" />

      <div class="p-10">
        <router-view></router-view>
      </div>
    </div>
  </UApp>
</template>
<style scoped></style>
