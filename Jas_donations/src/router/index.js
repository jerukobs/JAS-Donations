import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import DonationsView from '../views/DonationsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/donations',
      name: 'donations',
      component: DonationsView
    },
    {
      path:'/register',
      name: 'register',
      component: RegisterComponent
    },
    {
      path:'/login',
      name: 'login',
      component: LoginComponent
    }
  ]
})

export default router
