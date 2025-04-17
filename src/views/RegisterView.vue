<!-- src/views/RegisterView.vue -->
<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="user.name" type="text" id="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="user.email" type="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="user.password" type="password" id="password" required>
      </div>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <button type="submit" :disabled="loading">
        <span v-if="loading">Registering...</span>
        <span v-else>Register</span>
      </button>
      
      <p class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>
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
  name: '',
  email: '',
  password: ''
})
const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    await AuthService.register(user.value)
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
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

.error-message {
  color: #e74c3c;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: #ffebee;
  border-radius: 4px;
}

.login-link {
  margin-top: 1rem;
  text-align: center;
}
</style>