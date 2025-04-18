<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <i class="fas fa-address-book me-2 fs-3"></i>
        <span class="fs-4 fw-bold">ContactApp</span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              <i class="fas fa-home me-1"></i> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contacts" class="nav-link" active-class="active">
              <i class="fas fa-users me-1"></i> Contacts
            </router-link>
          </li>
          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link to="/login" class="nav-link" active-class="active">
                <i class="fas fa-sign-in-alt me-1"></i> Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/register"
                class="nav-link"
                active-class="active"
              >
                <i class="fas fa-user-plus me-1"></i> Register
              </router-link>
            </li>
          </template>
          <li v-if="isAuthenticated" class="nav-item">
            <button @click="handleLogout" class="btn btn-link nav-link">
              <i class="fas fa-sign-out-alt me-1"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import AuthService from "@/services/AuthService";
import { useRouter } from "vue-router";

const router = useRouter();

const isAuthenticated = computed(() => {
  return localStorage.getItem("user") !== null;
});

const handleLogout = () => {
  AuthService.logout();
  router.push("/login");
};
</script>

<style scoped>
.navbar {
  padding: 0.75rem 0;
}

.navbar-brand {
  transition: transform 0.2s;
}

.navbar-brand:hover {
  transform: scale(1.03);
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.nav-link:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.1);
}

.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.btn-link.nav-link {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
}

.btn-link.nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
