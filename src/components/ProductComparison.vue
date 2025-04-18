<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

// Список ID товаров для сравнения
const comparedProducts = ref([])

// Отслеживаемые товары
const productsToCompare = computed(() => {
  return props.products.filter((product) => comparedProducts.value.includes(product.id))
})

// Уникальные характеристики
const allFeatures = computed(() => {
  const features = new Set()
  productsToCompare.value.forEach((product) => {
    Object.keys(product.features || {}).forEach((feature) => {
      features.add(feature)
    })
  })
  return Array.from(features)
})

// Добавление в сравнение
const addToComparison = (productId) => {
  if (!comparedProducts.value.includes(productId)) {
    comparedProducts.value.push(productId)
    saveToLocalStorage()
  }
}

// Удаление из сравнения
const removeFromComparison = (productId) => {
  comparedProducts.value = comparedProducts.value.filter((id) => id !== productId)
  saveToLocalStorage()
}

// Очистка сравнения
const clearComparison = () => {
  comparedProducts.value = []
  localStorage.removeItem('comparedProducts')
}

// Форматирование цены
const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(price)
}

// Сохранение в localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('comparedProducts', JSON.stringify(comparedProducts.value))
}

// Загрузка из localStorage
const loadComparison = () => {
  const saved = localStorage.getItem('comparedProducts')
  if (saved) {
    comparedProducts.value = JSON.parse(saved)
  }
}

// Загрузка при монтировании
onMounted(() => {
  loadComparison()
})

// Экспортируем методы для использования в родительском компоненте
defineExpose({
  addToComparison,
})
</script>
<template>
  <div class="m-5 p-5 border border-gray-200 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Сравнение товаров</h2>

    <div v-if="productsToCompare.length === 0" class="p-5 text-center text-gray-500">
      Выберите товары для сравнения
    </div>

    <div v-else>
      <div class="mb-4">
        <button
          @click="clearComparison"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
        >
          Очистить сравнение
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th class="p-3 border border-gray-200 bg-gray-50 text-left">Характеристика</th>
              <th
                v-for="product in productsToCompare"
                :key="product.id"
                class="p-3 border border-gray-200 bg-gray-50 text-left relative"
              >
                <button
                  @click="removeFromComparison(product.id)"
                  class="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center cursor-pointer"
                >
                  ×
                </button>
                <div class="flex flex-col items-center">
                  <img
                    :src="product.imageUrl"
                    class="w-24 h-24 object-contain mb-2"
                    alt="Изображение товара"
                  />
                  <span class="font-medium">{{ product.title }}</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <!-- Размер -->
            <tr>
              <td class="p-3 border border-gray-200 font-medium">Размер</td>
              <td
                v-for="product in productsToCompare"
                :key="`${product.id}-size`"
                class="p-3 border border-gray-200 text-center"
              >
                {{ product.size || '-' }}
              </td>
            </tr>

            <!-- Материал -->
            <tr>
              <td class="p-3 border border-gray-200 font-medium">Материал</td>
              <td
                v-for="product in productsToCompare"
                :key="`${product.id}-material`"
                class="p-3 border border-gray-200 text-center"
              >
                {{ product.material || '-' }}
              </td>
            </tr>

            <!-- Характеристики из features -->
            <tr v-for="feature in allFeatures" :key="feature">
              <td class="p-3 border border-gray-200 font-medium">{{ feature }}</td>
              <td
                v-for="product in productsToCompare"
                :key="`${product.id}-${feature}`"
                class="p-3 border border-gray-200 text-center"
              >
                {{ product.features[feature] || '-' }}
              </td>
            </tr>

            <!-- Цена -->
            <tr>
              <td class="p-3 border border-gray-200 font-medium">Цена</td>
              <td
                v-for="product in productsToCompare"
                :key="`${product.id}-price`"
                class="p-3 border border-gray-200 text-center"
              >
                {{ formatPrice(product.price) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
