<template>
  <div class="home container-fluid px-0">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5 py-lg-7 position-relative">
      <div class="container py-4 py-lg-6">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-3">
              <i class="fas fa-address-book me-2"></i>
              Welcome <span class="text-warning"> {{ user.name }} </span> to Contact App
            </h1>
            <p class="lead mb-4 opacity-75">
              The modern way to manage your professional and personal connections
            </p>
            <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <router-link to="/contacts" class="btn btn-light btn-lg rounded-pill px-4 shadow-sm fw-medium">
                <i class="fas fa-users me-2"></i>
                View Contacts
              </router-link>
              <router-link to="/contacts/add" class="btn btn-outline-light btn-lg rounded-pill px-4 fw-medium">
                <i class="fas fa-user-plus me-2"></i>
                Add New Contact
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Favorites Section -->
    <section v-if="favoriteContacts.length > 0" class="favorites-section py-5 bg-light">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12">
            <h2 class="text-center mb-4">
              <i class="fas fa-star text-warning me-2"></i>
              Your Favorite Contacts
            </h2>
          </div>
        </div>
        <div class="row g-4">
          <div v-for="contact in favoriteContacts" :key="'fav-' + contact.id" class="col-12 col-md-6 col-lg-4 col-xl-3">
            <ContactCard
              :contact="contact"
              @click.native="goToContactDetails(contact.id)"
              class="h-100 shadow-sm hover-lift"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Number Lookup Section -->
    <section class="number-lookup-section py-5">
      <div class="container">
        <div class="row justify-content-center mb-4">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-3">
              <i class="fas fa-phone-alt me-2"></i>
              Number Lookup
            </h2>
            <p class="lead text-muted">
              Search for contacts by phone number
            </p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4 p-md-5">
                <div class="input-group mb-3">
                  <input
                    v-model="phoneQuery"
                    type="tel"
                    class="form-control form-control-lg"
                    placeholder="Enter phone number (e.g. 1234567890)"
                    @keyup.enter="searchNumber"
                  >
                  <button
                    class="btn btn-primary btn-lg"
                    type="button"
                    @click="searchNumber"
                    :disabled="loading"
                  >
                    <span v-if="loading">
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                      Searching...
                    </span>
                    <span v-else>
                      <i class="fas fa-search me-2"></i> Search
                    </span>
                  </button>
                </div>

                <div v-if="searchResults.length > 0" class="mt-4">
                  <h4 class="h5 mb-3">Search Results:</h4>
                  <div class="list-group">
                    <div
                      v-for="result in searchResults"
                      :key="result.id"
                      class="list-group-item list-group-item-action"
                      @click="goToContactDetails(result.id)"
                    >
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 class="mb-1">{{ result.name }}</h5>
                          <small class="text-muted">{{ result.phone }}</small>
                        </div>
                        <span v-if="result.isFavorite" class="text-warning">
                          <i class="fas fa-star"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="searchError" class="alert alert-danger mt-3 mb-0">
                  <i class="fas fa-exclamation-circle me-2"></i>{{ searchError }}
                </div>

                <div v-if="phoneQuery && !loading && searchResults.length === 0 && !searchError" class="alert alert-info mt-3 mb-0">
                  <i class="fas fa-info-circle me-2"></i>No contacts found with this number
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5 py-lg-7">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-3">Powerful Contact Management</h2>
            <p class="lead text-muted">
              Everything you need to stay connected with your network
            </p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm hover-lift">
              <div class="card-body p-4 text-center">
                <div class="icon-wrapper bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-4">
                  <i class="fas fa-users fa-2x"></i>
                </div>
                <h3 class="h4 mb-3">Manage Contacts</h3>
                <p class="text-muted mb-0">
                  Easily add, edit, and organize your contacts with our intuitive interface
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm hover-lift">
              <div class="card-body p-4 text-center">
                <div class="icon-wrapper bg-warning bg-opacity-10 text-warning rounded-circle mx-auto mb-4">
                  <i class="fas fa-star fa-2x"></i>
                </div>
                <h3 class="h4 mb-3">Favorites</h3>
                <p class="text-muted mb-0">
                  Mark your most important contacts for quick access anytime
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm hover-lift">
              <div class="card-body p-4 text-center">
                <div class="icon-wrapper bg-info bg-opacity-10 text-info rounded-circle mx-auto mb-4">
                  <i class="fas fa-search fa-2x"></i>
                </div>
                <h3 class="h4 mb-3">Smart Search</h3>
                <p class="text-muted mb-0">
                  Find any contact instantly with our powerful search functionality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useContactStore } from "@/stores/contactStore";
import ContactCard from "@/components/ContactCard.vue";

const contactStore = useContactStore();
const router = useRouter();
const user = JSON.parse(localStorage.getItem("user"));

// Search functionality
const phoneQuery = ref('');
const searchResults = ref([]);
const loading = ref(false);
const searchError = ref('');

// Get favorite contacts from store
const favoriteContacts = computed(() => contactStore.favoriteContacts);

const goToContactDetails = (id) => {
  router.push({ name: "contact-details", params: { id } });
};

onMounted(async () => {
  await contactStore.fetchContacts();
});

const searchNumber = async () => {
  if (!phoneQuery.value) {
    searchError.value = 'Please enter a phone number';
    return;
  }

  loading.value = true;
  searchError.value = '';
  searchResults.value = [];

  try {
    const normalizedQuery = phoneQuery.value.replace(/\D/g, ''); // Remove non-digit characters
    
    if (normalizedQuery.length < 3) {
      searchError.value = 'Please enter at least 3 digits';
      return;
    }
    const allContacts= await contactStore.fetchAllContacts();
    console.log('allContacts', allContacts);
    
    searchResults.value = allContacts.filter(contact => 
      contact.phone.includes(normalizedQuery)
    );

  } catch (error) {
    searchError.value = 'Error searching contacts. Please try again.';
    console.error('Search error:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Existing styles remain the same */

.number-lookup-section {
  background-color: #f8f9fa;
}

.list-group-item {
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-group-item:hover {
  background-color: #f1f1f1;
  transform: translateX(5px);
}

/* Responsive adjustments for the search section */
@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }
  
  .input-group .btn {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>