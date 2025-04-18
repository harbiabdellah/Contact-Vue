<template>
  <div class="contact-details-container">
    <div v-if="contact" class="card shadow-lg border-0">
      <div class="card-body p-4 p-md-5">
        <!-- Header Section -->
        <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <div>
            <h1 class="h2 mb-1">
              <i class="fas fa-user me-2"></i>
              {{ contact.name }}
            </h1>
            <div v-if="contact.isFavorite" class="text-warning small">
              <i class="fas fa-star"></i> Favorite Contact
            </div>
          </div>
          <button 
            @click="toggleFavorite" 
            class="btn btn-outline-warning btn-sm"
            :class="{ 'text-warning': contact.isFavorite }"
          >
            <i :class="contact.isFavorite ? 'fas fa-star' : 'far fa-star'"></i>
          </button>
        </div>

        <!-- Contact Info Section -->
        <div class="contact-info mb-4">
          <div class="d-flex align-items-center mb-3">
            <div class="icon-circle bg-primary bg-opacity-10 text-primary me-3">
              <i class="fas fa-envelope"></i>
            </div>
            <div>
              <h6 class="mb-0 text-muted small">Email</h6>
              <a :href="`mailto:${contact.email}`" class="text-decoration-none">
                {{ contact.email }}
              </a>
            </div>
          </div>

          <div class="d-flex align-items-center mb-3">
            <div class="icon-circle bg-success bg-opacity-10 text-success me-3">
              <i class="fas fa-phone"></i>
            </div>
            <div>
              <h6 class="mb-0 text-muted small">Phone</h6>
              <a :href="`tel:${contact.phone}`" class="text-decoration-none">
                {{ contact.phone }}
              </a>
            </div>
          </div>

          <div v-if="contact.address" class="d-flex align-items-center">
            <div class="icon-circle bg-info bg-opacity-10 text-info me-3">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h6 class="mb-0 text-muted small">Address</h6>
              <span>{{ contact.address }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex flex-column flex-md-row gap-2 mt-4 pt-3 border-top">
          <router-link
            :to="{ name: 'edit-contact', params: { id: contact.id } }"
            class="btn btn-primary flex-grow-1"
          >
            <i class="fas fa-edit me-2"></i> Edit Contact
          </router-link>
          <button 
            @click="deleteContact" 
            class="btn btn-outline-danger flex-grow-1"
          >
            <i class="fas fa-trash-alt me-2"></i> Delete
          </button>
          <router-link 
            to="/contacts" 
            class="btn btn-outline-secondary flex-grow-1"
          >
            <i class="fas fa-list me-2"></i> Back to List
          </router-link>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="card shadow border-0">
      <div class="card-body text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 mb-0">Loading contact details...</p>
      </div>
    </div>
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
  try {
    await contactStore.fetchContacts()
    contact.value = contactStore.getContactById(route.params.id)
    
    if (!contact.value) {
      router.push({ name: 'contacts' })
    }
  } catch (error) {
    console.error('Error loading contact:', error)
  }
})

const toggleFavorite = async () => {
  try {
    await contactStore.toggleFavorite(contact.value.id)
  } catch (error) {
    console.error('Error toggling favorite:', error)
  }
}

const deleteContact = async () => {
  if (confirm(`Are you sure you want to delete ${contact.value.name}?`)) {
    try {
      await contactStore.deleteContact(contact.value.id)
      router.push({ 
        name: 'contacts',
        query: { deleted: 'true' }
      })
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }
}
</script>

<style scoped>
.contact-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.card {
  border-radius: 1rem;
  overflow: hidden;
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .contact-details-container {
    padding: 1rem;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
}
</style>