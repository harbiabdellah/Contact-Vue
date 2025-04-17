<template>
  <div class="contact-details" v-if="contact">
    <div class="header">
      <h1>{{ contact.name }}</h1>
      <button @click="toggleFavorite" class="favorite-btn" :class="{ 'is-favorite': contact.isFavorite }">
        {{ contact.isFavorite ? '★' : '☆' }}
      </button>
    </div>

    <div class="contact-info">
      <div class="info-item">
        <span class="info-label">Email:</span>
        <a :href="`mailto:${contact.email}`" class="info-value">{{ contact.email }}</a>
      </div>
      
      <div class="info-item">
        <span class="info-label">Phone:</span>
        <a :href="`tel:${contact.phone}`" class="info-value">{{ contact.phone }}</a>
      </div>
      
      <div class="info-item" v-if="contact.address">
        <span class="info-label">Address:</span>
        <span class="info-value">{{ contact.address }}</span>
      </div>
    </div>

    <div class="actions">
      <router-link
        :to="{ name: 'edit-contact', params: { id: contact.id } }"
        class="edit-btn"
      >
        Edit Contact
      </router-link>
      <button @click="deleteContact" class="delete-btn">
        Delete Contact
      </button>
      <router-link to="/contacts" class="back-btn">
        Back to List
      </router-link>
    </div>
  </div>
  <div v-else class="loading">
    <div class="spinner"></div>
    <p>Loading contact details...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contactStore'

const route = useRoute()
const router = useRouter()
const contactStore = useContactStore()

const contact = ref(null)

onMounted(async () => {
  await contactStore.fetchContacts()
  contact.value = contactStore.getContactById(Number(route.params.id))
  
  if (!contact.value) {
    router.push({ name: 'contacts' })
  }
})

const toggleFavorite = async () => {
  await contactStore.toggleFavorite(contact.value.id)
}

const deleteContact = async () => {
  if (confirm('Are you sure you want to delete this contact?')) {
    await contactStore.deleteContact(contact.value.id)
    router.push({ name: 'contacts' })
  }
}
</script>

<style scoped>
.contact-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 2rem;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
}

.favorite-btn.is-favorite {
  color: gold;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.contact-info {
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  margin-bottom: 1rem;
  align-items: baseline;
}

.info-label {
  font-weight: bold;
  color: #2c3e50;
  min-width: 100px;
}

.info-value {
  flex: 1;
  color: #34495e;
}

.info-value a {
  color: #3498db;
  text-decoration: none;
}

.info-value a:hover {
  text-decoration: underline;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.edit-btn, .delete-btn, .back-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.edit-btn {
  background-color: #3498db;
  color: white;
  border: none;
}

.edit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #d63b2b;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
}

.back-btn {
  background-color: #95a5a6;
  color: white;
}

.back-btn:hover {
  background-color: #7f8c8d;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(149, 165, 166, 0.3);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(66, 185, 131, 0.2);
  border-radius: 50%;
  border-top-color: #42b983;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 600px) {
  .actions {
    flex-direction: column;
  }
  
  .edit-btn, .delete-btn, .back-btn {
    width: 100%;
    text-align: center;
  }
}
</style>