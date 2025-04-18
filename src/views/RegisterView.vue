<template>
  <div class="auth-container">
    <div class="auth-card shadow-lg">
      <div class="auth-header text-center mb-4">
        <i class="fas fa-user-plus fa-3x text-primary mb-3"></i>
        <h1 class="h2 mb-3">Create Account</h1>
        <p class="text-muted">Join us today to start managing your contacts</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="mb-3">
          <label for="name" class="form-label">
            <i class="fas fa-user me-2"></i>Full Name
          </label>
          <input
            v-model="user.name"
            type="text"
            class="form-control form-control-lg"
            id="name"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">
            <i class="fas fa-envelope me-2"></i>Email Address
          </label>
          <input
            v-model="user.email"
            type="email"
            class="form-control form-control-lg"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">
            <i class="fas fa-lock me-2"></i>Password
          </label>
          <div class="input-group">
            <input
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-control form-control-lg"
              id="password"
              placeholder="Create a password"
              required
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <div class="form-text">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </div>
        </div>

        <div class="d-grid mb-3">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            :disabled="loading"
          >
            <span v-if="loading">
              <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Registering...
            </span>
            <span v-else>
              <i class="fas fa-user-plus me-2"></i>Register
            </span>
          </button>
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
          <i class="fas fa-exclamation-circle me-2"></i>{{ errorMessage }}
        </div>

        <div v-if="successMessage" class="alert alert-success">
          <i class="fas fa-check-circle me-2"></i>{{ successMessage }}
        </div>

        <div class="text-center mt-3">
          <p class="text-muted">
            Already have an account?
            <router-link to="/login" class="text-primary fw-bold"
              >Login here</router-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const user = ref({
  name: "",
  email: "",
  password: "",
});
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const showPassword = ref(false);

const API_URL = "http://localhost:3000/users";

const handleRegister = async () => {
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const existing = await axios.get(`${API_URL}?email=${user.value.email}`);
    if (existing.data.length > 0) {
      throw new Error("Email already in use.");
    }

    await axios.post(API_URL, user.value);

    successMessage.value = "Registration successful! Redirecting to login...";

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    errorMessage.value = error.message || "Registration failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
}

.auth-card {
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem;
  border-radius: 1rem;
  background-color: white;
}

.auth-header {
  padding-bottom: 1rem;
}

.auth-form {
  margin-top: 1.5rem;
}

.form-control-lg {
  padding: 0.75rem 1rem;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
}

@media (max-width: 576px) {
  .auth-container {
    padding: 1rem;
  }

  .auth-card {
    padding: 1.5rem;
  }
}
</style>
