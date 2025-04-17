import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const ContactListView = () => import('@/views/ContactListView.vue')
const ContactDetailsView = () => import('@/views/ContactDetailsView.vue')
const AddContactView = () => import('@/views/AddContactView.vue')
const EditContactView = () => import('@/views/EditContactView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home', requiresAuth: true }
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactListView,
    meta: { title: 'Contacts', requiresAuth: true }
  },
  {
    path: '/contacts/add',
    name: 'add-contact',
    component: AddContactView,
    meta: { title: 'Add Contact', requiresAuth: true }
  },
  {
    path: '/contacts/:id',
    name: 'contact-details',
    component: ContactDetailsView,
    props: true,
    meta: { title: 'Contact Details', requiresAuth: true }
  },
  {
    path: '/contacts/edit/:id',
    name: 'edit-contact',
    component: EditContactView,
    props: true,
    meta: { title: 'Edit Contact', requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login', requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Register', requiresGuest: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Contact App` : 'Contact App'
  
  const isAuthenticated = localStorage.getItem('user') !== null
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router