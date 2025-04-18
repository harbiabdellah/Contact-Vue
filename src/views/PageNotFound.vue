<template>
  <div class="page-not-found">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <div class="error-card shadow-lg p-4 p-md-5">
            <div class="error-icon mb-4">
              <i class="fas fa-exclamation-triangle fa-5x text-warning"></i>
            </div>
            <h1 class="display-4 fw-bold mb-3">404 - Page Not Found</h1>
            <p class="lead mb-4">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div class="d-flex flex-column flex-md-row justify-content-center gap-3">
              <router-link 
                to="/" 
                class="btn btn-primary btn-lg px-4 py-3"
              >
                <i class="fas fa-home me-2"></i>Return Home
              </router-link>
              <button 
                @click="goBack" 
                class="btn btn-outline-secondary btn-lg px-4 py-3"
              >
                <i class="fas fa-arrow-left me-2"></i>Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.page-not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
}

.error-card {
  background-color: white;
  border-radius: 1rem;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.error-icon {
  animation: bounce 2s infinite;
}

.error-card::before {
  content: "404";
  position: absolute;
  top: -30px;
  right: -30px;
  font-size: 12rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.03);
  z-index: 0;
}

.btn-lg {
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-lg:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .error-card {
    padding: 2rem;
  }
  
  .display-4 {
    font-size: 2.5rem;
  }
  
  .error-card::before {
    font-size: 8rem;
    top: -20px;
    right: -20px;
  }
}

@media (max-width: 576px) {
  .page-not-found {
    padding: 1rem;
  }
  
  .display-4 {
    font-size: 2rem;
  }
  
  .error-card {
    padding: 1.5rem;
  }
  
  .btn-lg {
    width: 100%;
  }
  
  .d-flex {
    flex-direction: column;
  }
}
</style>