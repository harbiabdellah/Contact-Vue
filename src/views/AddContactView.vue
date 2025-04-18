<template>
  <div class="add-contact">
    <h1>Add New Contact</h1>
    <ContactForm
      submitText="Add Contact"
      :showFavorite="true"
      @submit="handleSubmit"
    />
    
    <div v-if="isSubmitting" class="submitting-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contactStore'
import ContactForm from '@/components/ContactForm.vue'
const router = useRouter()
const contactStore = useContactStore()
const isSubmitting = ref(false)

const handleSubmit = async (contactData) => {
  try {
    isSubmitting.value = true
    await contactStore.addContact(contactData)
    router.push({ name: 'contacts' })
  } catch (error) {
    alert('Failed to add contact: ' + error.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.submitting-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>