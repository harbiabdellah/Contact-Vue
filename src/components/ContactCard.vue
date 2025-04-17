<template>
  <Transition name="fade" mode="out-in">
    <div class="contact-card" :class="{ 'favorite': contact.isFavorite }">
      <div class="contact-info">
        <h3>{{ contact.name }}</h3>
        <div class="contact-details">
          <p><span class="label">Email:</span> <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p>
          <p><span class="label">Phone:</span> <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a></p>
          <p v-if="contact.address"><span class="label">Address:</span> {{ contact.address }}</p>
        </div>
      </div>

      <div class="contact-actions">
        <button 
          @click.stop="toggleFavorite" 
          class="favorite-btn"
          :aria-label="contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          {{ contact.isFavorite ? '★' : '☆' }}
        </button>
        <router-link 
          :to="{ name: 'contact-details', params: { id: contact.id } }"
          class="btn details-btn"
        >
          Details
        </router-link>
        <router-link 
          :to="{ name: 'edit-contact', params: { id: contact.id } }"
          class="btn edit-btn"
        >
          Edit
        </router-link>
        <button 
          @click.stop="deleteContact" 
          class="btn delete-btn"
          aria-label="Delete contact"
        >
          Delete
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contactStore'

const props = defineProps({
  contact: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['id', 'name', 'email', 'phone'].every(key => key in value)
    }
  }
})

const router = useRouter()
const contactStore = useContactStore()

const toggleFavorite = async () => {
  await contactStore.toggleFavorite(props.contact.id)
}

const deleteContact = async () => {
  if (confirm(`Are you sure you want to delete ${props.contact.name}?`)) {
    await contactStore.deleteContact(props.contact.id)
  }
}

const goToDetails = () => {
  router.push({ name: 'contact-details', params: { id: props.contact.id } })
}
</script>

<style scoped>
.contact-card {
  transition: all 0.3s ease;
}

.favorite {
  border-left: 4px solid gold;
  background-color: #fffef0;
}

.contact-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.details-btn {
  background-color: #42b983;
  color: white;
}

.edit-btn {
  background-color: #3498db;
  color: white;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
}

/* Improved transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
