<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
      <span class="logo-icon">📱</span>
      <span class="logo-text">Contact App</span>
    </router-link>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/contacts">Contacts</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
      <button v-if="isAuthenticated" @click="handleLogout" class="logout-btn">Logout</button>
    </div>
  </nav>
</template>
<script setup>
import { computed } from 'vue'
import AuthService from '@/services/AuthService'
import { useRouter } from 'vue-router'

const router = useRouter()

const isAuthenticated = computed(() => {
  return localStorage.getItem('user') !== null
})

const handleLogout = () => {
  AuthService.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.8rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-links a.router-link-exact-active {
  background-color: #42b983;
}
.logout-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  padding: 0.5rem 1rem;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>