<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="user.email" type="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="user.password" type="password" id="password" required>
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
      <p class="register-link">
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/AuthService'

const router = useRouter()
const user = ref({
  email: '',
  password: ''
})
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    await AuthService.login(user.value)
    router.push('/')
  } catch (error) {
    alert('Login failed: ' + error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-link {
  margin-top: 1rem;
  text-align: center;
}
</style>