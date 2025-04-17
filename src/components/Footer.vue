<template>
  <footer class="footer">
    <div class="footer-content">
      <p>Contact App © {{ new Date().getFullYear() }} - All rights reserved</p>
      <div class="social-links">
        <a href="#" class="social-link">Twitter</a>
        <a href="#" class="social-link">Facebook</a>
        <a href="#" class="social-link">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem 0;
  margin-top: 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #42b983;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>