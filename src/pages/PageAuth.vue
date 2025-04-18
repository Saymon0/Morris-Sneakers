<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, computed, ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const isLogin = ref(true)
const isLoading = ref(false)
const router = useRouter()

const toggleAuth = () => {
  isLogin.value = !isLogin.value
}

const subtitleText = computed(() => {
  return isLogin.value ? 'Аккаунта ещё нет?' : 'Уже есть аккаунт?'
})

const linkAccountText = computed(() => {
  return isLogin.value ? 'Создайте сейчас' : 'Войдите в него'
})

const submitButtonText = computed(() => {
  return isLogin.value ? 'Войти' : 'Зарегистрироваться'
})

const signUp = async (): Promise<void> => {
  isLoading.value = true
  try {
    await createUserWithEmailAndPassword(getAuth(), state.email, state.password)
    toast.add({ title: 'Успех!', description: 'Регистрация прошла успешно', color: 'success' })
    router.push('/')
  } catch (error: unknown) {
    toast.add({ title: 'Ошибка!', description: error.message, color: 'error' })
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const signIn = async (): Promise<void> => {
  isLoading.value = true

  try {
    await signInWithEmailAndPassword(getAuth(), state.email, state.password)
    toast.add({ title: 'Успех!', description: 'Авторизация прошла успешно', color: 'success' })
    router.push('/')
  } catch (error: unknown) {
    toast.add({ title: 'Ошибка!', description: error.message, color: 'error' })
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const schema = z.object({
  email: z.string().email('Неправильный email'),
  password: z.string().min(8, 'Должно быть минимум 8 символов'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  if (isLogin.value) {
    signIn()
  } else {
    signUp()
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="Пароль" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <UButton :loading="isLoading" class="cursor-pointer" type="submit">
        {{ submitButtonText }}
      </UButton>
    </UForm>
    <div>
      <span class="text-600 font-medium line-height-3">{{ subtitleText }}</span>
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toggleAuth">{{
        linkAccountText
      }}</a>
    </div>
  </div>
</template>
