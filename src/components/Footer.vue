<template>
  <footer class="bg-dark text-white py-4 mt-auto">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <p class="mb-0">
            <i class="fas fa-address-book me-2"></i>
            Contact App © {{ new Date().getFullYear() }} - All rights reserved
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <div class="social-links">
            <a href="#" class="text-white mx-2" aria-label="Twitter">
              <i class="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" class="text-white mx-2" aria-label="Facebook">
              <i class="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" class="text-white mx-2" aria-label="GitHub">
              <i class="fab fa-github fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
}

.social-links a {
  transition: all 0.3s ease;
  display: inline-block;
}

.social-links a:hover {
  color: #42b983 !important;
  transform: translateY(-2px);
}
</style>