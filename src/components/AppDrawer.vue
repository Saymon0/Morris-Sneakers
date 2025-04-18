<script setup>
import { computed, inject, ref } from 'vue'
import DrawerHeader from './DrawerHeader.vue'
import axios from 'axios'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
})

const isCreatingOrder = ref(false)
const orderId = ref(null)

const buttonDisabled = computed(() => {
  if (props.isCreatingOrder) {
    return true
  } else {
    if (props.totalPrice) {
      return false
    } else {
      return true
    }
  }
})

const TAX = 5

const totalTax = computed(() => Math.round((props.totalPrice * TAX) / 100))

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://4cb01a3f49d4155a.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice,
    })

    cart.value = []
    orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

const { cart, closeDrawer } = inject('cart')
</script>

<template>
  <div class="fixed inset-0 size-full bg-black/70 z-10"></div>
  <div class="bg-white w-96 h-full z-11 fixed right-0 top-0 p-8">
    <DrawerHeader />

    <div v-if="!totalPrice || orderId" class="flex items-center h-full">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен"
        :description="`Ваш заказ номер ${orderId} и скоро будет передан доставке`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else>
      <CartListItem />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed" />
          <b>{{ totalPrice }} Руб. </b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed" />
          <b>{{ totalTax }} Руб. </b>
        </div>
        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="mt-4 bg-lime-400 cursor-pointer disabled:bg-slate-300 transition not-disabled:hover:scale-105 w-full rounded-xl py-3 text-white hover:bg-lime-500 active:bg-lime-700"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
