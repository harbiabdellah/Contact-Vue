<template>
  <div class="edit-contact-container">
    <div class="card shadow-lg border-0">
      <div class="card-body p-4 p-md-5">
        <div class="d-flex align-items-center mb-4">
          <router-link 
            :to="{ name: 'contact-details', params: { id: contact?.id } }" 
            class="btn btn-outline-secondary btn-sm me-3"
          >
            <i class="fas fa-arrow-left"></i>
          </router-link>
          <h1 class="h2 mb-0">
            <i class="fas fa-user-edit text-primary me-2"></i>
            Edit Contact
          </h1>
        </div>

        <ContactForm
          v-if="contact"
          :contact="contact"
          submitText="Update Contact"
          :showCancel="true"
          :showFavorite="true"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />

        <div v-else class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Loading contact details...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contactStore'
import ContactForm from '@/components/ContactForm.vue'

const route = useRoute()
const router = useRouter()
const contactStore = useContactStore()

const contact = ref(null)
const loading = ref(false)

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

const handleSubmit = async (contactData) => {
  loading.value = true
  try {
    await contactStore.updateContact(contact.value.id, contactData)
    router.push({ 
      name: 'contact-details', 
      params: { id: contact.value.id },
      query: { updated: 'true' }
    })
  } catch (error) {
    console.error('Failed to update contact:', error)
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push({ name: 'contact-details', params: { id: contact.value.id } })
}
</script>

<style scoped>
.edit-contact-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.card {
  border-radius: 1rem;
  overflow: hidden;
}

@media (max-width: 768px) {
  .edit-contact-container {
    padding: 1rem;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
}
</style>