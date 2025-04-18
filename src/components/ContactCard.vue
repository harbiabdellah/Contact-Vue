<template>
  <Transition name="fade" mode="out-in">
    <div class="card mb-3 shadow-sm hover-shadow border-0 h-100" 
         :class="{ 'border-start border-warning border-4': contact.isFavorite }">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h3 class="card-title mb-0">
            <i class="fas fa-user me-2"></i>
            {{ contact.name }}
            <span v-if="contact.isFavorite" class="ms-2 text-warning">
              <i class="fas fa-star"></i>
            </span>
          </h3>
          <button 
            @click.stop="toggleFavorite" 
            class="btn btn-sm btn-outline-warning"
            :aria-label="contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          >
            <i :class="contact.isFavorite ? 'fas fa-star' : 'far fa-star'"></i>
          </button>
        </div>

        <div class="contact-details mb-3">
          <p class="mb-2">
            <i class="fas fa-envelope me-2 text-muted"></i>
            <a :href="`mailto:${contact.email}`" class="text-decoration-none">{{ contact.email }}</a>
          </p>
          <p class="mb-2">
            <i class="fas fa-phone me-2 text-muted"></i>
            <a :href="`tel:${contact.phone}`" class="text-decoration-none">{{ contact.phone }}</a>
          </p>
          <p v-if="contact.address" class="mb-0">
            <i class="fas fa-map-marker-alt me-2 text-muted"></i>
            {{ contact.address }}
          </p>
        </div>

        <div class="d-flex flex-wrap gap-2">
          <router-link 
            :to="{ name: 'contact-details', params: { id: contact.id } }"
            class="btn btn-sm btn-outline-primary flex-grow-1"
          >
            <i class="fas fa-info-circle me-1"></i> Details
          </router-link>
          <router-link 
            :to="{ name: 'edit-contact', params: { id: contact.id } }"
            class="btn btn-sm btn-outline-success flex-grow-1"
          >
            <i class="fas fa-edit me-1"></i> Edit
          </router-link>
          <button 
            @click.stop="deleteContact" 
            class="btn btn-sm btn-outline-danger flex-grow-1"
            aria-label="Delete contact"
          >
            <i class="fas fa-trash-alt me-1"></i> Delete
          </button>
        </div>
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
</script>

<style scoped>
.hover-shadow {
  transition: all 0.3s ease;
}

.hover-shadow:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.contact-details a {
  color: inherit;
  transition: color 0.2s;
}

.contact-details a:hover {
  color: #42b983;
  text-decoration: underline;
}

.btn-sm {
  min-width: 100px;
}

@media (max-width: 576px) {
  .btn-sm {
    flex-grow: 1 !important;
  }
}
</style>