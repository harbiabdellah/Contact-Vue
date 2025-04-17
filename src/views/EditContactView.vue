<template>
  <div class="edit-contact">
    <h1>Edit Contact</h1>
    <ContactForm
      :contact="contact"
      submitText="Update Contact"
      :showCancel="true"
      :showFavorite="true"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
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

onMounted(async () => {
  await contactStore.fetchContacts()
  contact.value = contactStore.getContactById(Number(route.params.id))
  
  if (!contact.value) {
    router.push({ name: 'contacts' })
  }
})

const handleSubmit = async (contactData) => {
  try {
    await contactStore.updateContact(contact.value.id, contactData)
    router.push({ name: 'contact-details', params: { id: contact.value.id } })
  } catch (error) {
    console.error('Failed to update contact:', error)
  }
}

const handleCancel = () => {
  router.push({ name: 'contact-details', params: { id: contact.value.id } })
}
</script>

<style scoped>
.edit-contact {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
}
</style>