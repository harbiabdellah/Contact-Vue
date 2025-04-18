<template>
  <div class="home container-fluid px-0">
    <!-- Hero Section -->
    <section
      class="hero-section bg-primary text-white py-5 py-lg-7 position-relative"
    >
      <div class="container py-4 py-lg-6">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-3">
              <i class="fas fa-address-book me-2"></i>
              Welcome <span class="text-warning " > {{ user.name }} </span> to Contact App 
            </h1>
            <p class="lead mb-4 opacity-75">
              The modern way to manage your professional and personal
              connections
            </p>
            <div
              class="d-flex flex-column flex-sm-row justify-content-center gap-3"
            >
              <router-link
                to="/contacts"
                class="btn btn-light btn-lg rounded-pill px-4 shadow-sm fw-medium"
              >
                <i class="fas fa-users me-2"></i>
                View Contacts
              </router-link>
              <router-link
                to="/contacts/add"
                class="btn btn-outline-light btn-lg rounded-pill px-4 fw-medium"
              >
                <i class="fas fa-user-plus me-2"></i>
                Add New Contact
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="custom-shape-divider-bottom">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div> -->
    </section>

    <!-- Favorites Section -->
    <section
      v-if="favoriteContacts.length > 0"
      class="favorites-section py-5 bg-light"
    >
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
          <div
            v-for="contact in favoriteContacts"
            :key="'fav-' + contact.id"
            class="col-12 col-md-6 col-lg-4 col-xl-3"
          >
            <ContactCard
              :contact="contact"
              @click.native="goToContactDetails(contact.id)"
              class="h-100 shadow-sm hover-lift"
            />
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
                <div
                  class="icon-wrapper bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-4"
                >
                  <i class="fas fa-users fa-2x"></i>
                </div>
                <h3 class="h4 mb-3">Manage Contacts</h3>
                <p class="text-muted mb-0">
                  Easily add, edit, and organize your contacts with our
                  intuitive interface
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card card h-100 border-0 shadow-sm hover-lift">
              <div class="card-body p-4 text-center">
                <div
                  class="icon-wrapper bg-warning bg-opacity-10 text-warning rounded-circle mx-auto mb-4"
                >
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
                <div
                  class="icon-wrapper bg-info bg-opacity-10 text-info rounded-circle mx-auto mb-4"
                >
                  <i class="fas fa-search fa-2x"></i>
                </div>
                <h3 class="h4 mb-3">Smart Search</h3>
                <p class="text-muted mb-0">
                  Find any contact instantly with our powerful search
                  functionality
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
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useContactStore } from "@/stores/contactStore";
import ContactCard from "@/components/ContactCard.vue";

const contactStore = useContactStore();
const router = useRouter();
const user =  JSON.parse(localStorage.getItem("user"));
const favoriteContacts = computed(() => contactStore.favoriteContacts);

const goToContactDetails = (id) => {
  router.push({ name: "contact-details", params: { id } });
};
</script>

<style scoped>
/* Custom Styles */
.hero-section {
  position: relative;
  background-color: #3a7bd5;
  color: white;
  overflow: hidden;
}

.custom-shape-divider-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  color: white;
}

.custom-shape-divider-bottom svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .display-4 {
    font-size: 2.5rem;
  }

  .btn-lg {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .display-4 {
    font-size: 2rem;
  }

  .lead {
    font-size: 1rem;
  }
}
</style>
