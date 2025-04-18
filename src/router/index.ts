import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import FavoritesMain from '../pages/FavoritesMain.vue'
import HomeMain from '../pages/HomeMain.vue'
import PageAuth from '../pages/PageAuth.vue'

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  let isAuth = false

  onAuthStateChanged(getAuth(), (user) => {
    if (user && !isAuth) {
      isAuth = true
      next()
    } else if (!user && isAuth) {
      isAuth = true
      next('/auth')
    }
  })
}

const routes = [
  { path: '/', name: 'Home', component: HomeMain },
  { path: '/favorites', name: 'Favorites', component: FavoritesMain },
  { path: '/auth', name: 'Authentification', component: PageAuth },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
