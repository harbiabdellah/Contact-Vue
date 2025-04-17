<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        required
        placeholder="Enter full name"
      />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
        placeholder="Enter email address"
      />
    </div>

    <div class="form-group">
      <label for="phone">Phone:</label>
      <input
        id="phone"
        v-model="formData.phone"
        type="tel"
        required
        placeholder="Enter phone number"
      />
    </div>

    <div class="form-group">
      <label for="address">Address:</label>
      <textarea
        id="address"
        v-model="formData.address"
        rows="3"
        placeholder="Enter full address"
      ></textarea>
    </div>

    <div class="form-group" v-if="showFavorite">
      <label class="checkbox-label">
        <input
          type="checkbox"
          v-model="formData.isFavorite"
        />
        Mark as favorite
      </label>
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-btn">
        {{ submitText }}
      </button>
      <button
        type="button"
        @click="$emit('cancel')"
        class="cancel-btn"
        v-if="showCancel"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  contact: Object,
  submitText: String,
  showCancel: Boolean,
  showFavorite: Boolean
})

const emit = defineEmits(['submit', 'cancel'])

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  isFavorite: false
})

// تحقق من صحة البريد الإلكتروني
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const handleSubmit = () => {
  if (!formData.name || !formData.email || !formData.phone) {
    alert('Please fill all required fields')
    return
  }
  
  if (!isValidEmail(formData.email)) {
    alert('Please enter a valid email address')
    return
  }
  
  emit('submit', { ...formData })
}
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #2c3e50;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background-color: #3aa876;
  transform: translateY(-1px);
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background-color: #d63b2b;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .form-actions {
    flex-direction: column;
  }
  
  .submit-btn, .cancel-btn {
    width: 100%;
  }
}
</style>