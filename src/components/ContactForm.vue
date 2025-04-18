<template>
  <form @submit.prevent="handleSubmit" class="contact-form-container">
    <div class="card shadow-sm border-0">
      <div class="card-body p-4">
        <h3 class="card-title mb-4 text-center">
          <i class="fas fa-user-edit me-2"></i>
          {{ submitText }}
        </h3>

        <div class="mb-3">
          <label for="name" class="form-label">
            <i class="fas fa-user me-2"></i>Full Name
          </label>
          <div class="input-group">
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-control form-control-lg"
              required
              placeholder="Ahmed M.Salah"
            />
            <span class="input-group-text">
              <i class="fas fa-asterisk text-danger small"></i>
            </span>
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">
            <i class="fas fa-envelope me-2"></i>Email Address
          </label>
          <div class="input-group">
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="form-control form-control-lg"
              required
              placeholder="ahmed@gmail.com"
            />
            <span class="input-group-text">
              <i class="fas fa-asterisk text-danger small"></i>
            </span>
          </div>
          <div v-if="emailError" class="text-danger small mt-1">
            <i class="fas fa-exclamation-circle me-1"></i> {{ emailError }}
          </div>
        </div>

        <div class="mb-3">
          <label for="phone" class="form-label">
            <i class="fas fa-phone me-2"></i>Phone Number
          </label>
          <div class="input-group">
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="form-control form-control-lg"
              required
              placeholder="+1234567890"
            />
            <span class="input-group-text">
              <i class="fas fa-asterisk text-danger small"></i>
            </span>
          </div>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">
            <i class="fas fa-map-marker-alt me-2"></i>Address
          </label>
          <textarea
            id="address"
            v-model="formData.address"
            class="form-control"
            rows="3"
            placeholder="123 Main St, City, Country"
          ></textarea>
        </div>

        <div class="mb-4 form-check" v-if="showFavorite">
          <input
            type="checkbox"
            v-model="formData.isFavorite"
            class="form-check-input"
            id="favoriteCheck"
          />
          <label class="form-check-label" for="favoriteCheck">
            <i class="fas fa-star me-1 text-warning"></i>Mark as favorite
          </label>
        </div>

        <div
          class="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4"
        >
        
        <button
        v-if="showCancel"
        type="button"
        @click="$emit('cancel')"
        class="btn btn-outline-secondary btn-lg flex-grow-1 flex-sm-grow-0"
        >
        <router-link to="/contacts" class="text-decoration-none text-gray-800">
            <i class="fas fa-times me-2"></i>Cancel
          </router-link>
        
          </button>
          <button
            type="submit"
            class="btn btn-primary btn-lg flex-grow-1 flex-sm-grow-0"
            :disabled="loading"
          >
            <span v-if="loading">
              <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Processing...
            </span>
            <span v-else>
              <i class="fas fa-save me-2"></i>{{ submitText }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from "vue";

const props = defineProps({
  contact: Object,
  submitText: {
    type: String,
    default: "Save Contact",
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showFavorite: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "cancel"]);

const formData = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
  isFavorite: false,
});

const emailError = ref("");

// Watch for contact prop changes to populate form
watch(
  () => props.contact,
  (newContact) => {
    if (newContact) {
      Object.assign(formData, {
        name: newContact.name || "",
        email: newContact.email || "",
        phone: newContact.phone || "",
        address: newContact.address || "",
        isFavorite: newContact.isFavorite || false,
      });
    }
  },
  { immediate: true }
);

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateForm = () => {
  emailError.value = "";

  if (!formData.name) {
    return "Name is required";
  }

  if (!formData.email) {
    return "Email is required";
  }

  if (!isValidEmail(formData.email)) {
    emailError.value = "Please enter a valid email address";
    return "Invalid email format";
  }

  if (!formData.phone) {
    return "Phone number is required";
  }

  return null;
};

const handleSubmit = () => {
  const validationError = validateForm();
  if (validationError) {
    return;
  }

  emit("submit", { ...formData });
};
</script>

<style scoped>
.contact-form-container {
  max-width: 600px;
  margin: 0 auto;
}

.card {
  border-radius: 12px;
  overflow: hidden;
}

.form-control-lg {
  padding: 0.75rem 1rem;
}

textarea.form-control {
  min-height: 100px;
}

.form-check-input {
  width: 1.2em;
  height: 1.2em;
  margin-top: 0.2em;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
}

/* Animation for form inputs */
.form-control {
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 0.25rem rgba(66, 185, 131, 0.25);
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .card-body {
    padding: 1.5rem;
  }

  .btn-lg {
    width: 100%;
  }
}
</style>
