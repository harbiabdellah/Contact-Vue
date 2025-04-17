<template>
  <div class="contact-list">
    <!-- Header Section -->
    <h1>Contact List</h1>
    
    <!-- Controls Section -->
    <div class="controls">
      <router-link to="/contacts/add" class="add-btn">
        <span>+</span> Add New Contact
      </router-link>
      
      <div class="search-container" @click="focusSearch">
        <input
          ref="searchInput"
          v-model="contactStore.searchQuery"
          type="text"
          placeholder="Search contacts..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
    </div>

    <!-- Loading or Error Messages -->
    <div v-if="contactStore.isLoading" class="loading">
      <div class="spinner"></div>
      <p>Loading contacts...</p>
    </div>
    
    <div v-else-if="contactStore.error" class="error-message">
      <p>Error: {{ contactStore.error }}</p>
      <button @click="contactStore.fetchContacts" class="retry-btn">Retry</button>
    </div>
    
    <!-- Favorites Section -->
    <template v-else>
      <div v-if="contactStore.favoriteContacts.length > 0" class="favorites-section">
        <h2>⭐ Favorites</h2>
        <div class="contacts-grid">
          <ContactCard
            v-for="contact in contactStore.favoriteContacts"
            :key="'fav-' + contact.id"
            :contact="contact"
          />
        </div>
      </div>

      <!-- All Contacts Section -->
      <div class="all-contacts-section">
        <h2>👥 All Contacts</h2>
        <div v-if="contactStore.filteredContacts.length === 0" class="empty-state">
          <p>No contacts found. <router-link to="/contacts/add">Add your first contact</router-link></p>
        </div>
        <div v-else class="contacts-grid">
          <ContactCard
            v-for="contact in contactStore.filteredContacts"
            :key="contact.id"
            :contact="contact"
            v-show="!contact.isFavorite"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useContactStore } from '@/stores/contactStore'
import ContactCard from '@/components/ContactCard.vue'

const contactStore = useContactStore()
const searchInput = ref(null)

const focusSearch = () => {
  searchInput.value.focus()
}

onMounted(() => {
  contactStore.fetchContacts()
})
</script>

<style scoped>
.contact-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-btn:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 185, 131, 0.3);
}

.add-btn span {
  font-size: 1.2rem;
}

.search-container {
  position: relative;
  flex-grow: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1.5rem 0.75rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(66, 185, 131, 0.2);
  border-radius: 50%;
  border-top-color: #42b983;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background-color: #ffebee;
  color: #e74c3c;
  padding: 1.5rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 2rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background-color: #d63b2b;
}

.favorites-section, .all-contacts-section {
  margin-bottom: 3rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 4px;
  text-align: center;
  color: #7f8c8d;
}

.empty-state a {
  color: #42b983;
  text-decoration: none;
}

.empty-state a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-container {
    max-width: 100%;
  }
  
  .contacts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
