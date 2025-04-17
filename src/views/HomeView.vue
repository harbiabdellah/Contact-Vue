<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <h1>Welcome to Contact App</h1>
      <p class="subtitle">Manage your contacts with ease</p>
      <div class="action-buttons">
        <router-link to="/contacts" class="btn primary-btn">View Contacts</router-link>
        <router-link to="/contacts/add" class="btn secondary-btn">Add New Contact</router-link>
      </div>
    </div>
    
    <!-- Favorites Section -->
    <div v-if="favoriteContacts.length > 0" class="favorites-section">
      <h2>⭐ Your Favorite Contacts</h2>
      <div class="contacts-grid">
        <ContactCard
          v-for="contact in favoriteContacts"
          :key="'fav-' + contact.id"
          :contact="contact"
          @click.native="goToContactDetails(contact.id)"
        />
      </div>
    </div>
    
    <!-- Features Section -->
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">👥</div>
        <h3>Manage Contacts</h3>
        <p>Easily add, edit, and delete your contacts</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⭐</div>
        <h3>Favorites</h3>
        <p>Mark your favorite contacts for quick access</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3>Search</h3>
        <p>Quickly find contacts with powerful search</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contactStore'
import ContactCard from '@/components/ContactCard.vue'

const contactStore = useContactStore()
const router = useRouter()

const favoriteContacts = computed(() => contactStore.favoriteContacts)

const goToContactDetails = (id) => {
  router.push({ name: 'contact-details', params: { id } })
}
</script>

<style scoped>
/* أنماط سابقة مع إضافة: */
.favorites-section {
  margin: 3rem 0;
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  margin: 0 0.5rem;
  transition: all 0.2s ease;
}

.primary-btn {
  background-color: #42b983;
  color: white;
}

.primary-btn:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 185, 131, 0.3);
}

.secondary-btn {
  background-color: #3498db;
  color: white;
}

.secondary-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #7f8c8d;
  margin: 0;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .btn {
    display: block;
    margin: 0.5rem auto;
    max-width: 200px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
