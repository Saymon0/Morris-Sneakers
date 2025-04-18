<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number,
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <RouterLink to="/">
      <div class="flex flex-col gap-1">
        <p class="text-4xl select-none font-medium">
          Morris<span class="text-sky-800">Sneakers</span>
        </p>
        <div>
          <p class="text-slate-500 text-lg">Весь мир покупает в нашем магазине</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-10">
      <li
        @click="emit('openDrawer')"
        class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} рублей</b>
      </li>
      <RouterLink to="/favorites"
        ><li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="Heart" />
          <span>Закладки</span>
        </li></RouterLink
      >

      <RouterLink to="/auth">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/profile.svg" alt="Profile" />
          <span>Авторизация</span>
        </li></RouterLink
      >
    </ul>
  </header>
</template>
