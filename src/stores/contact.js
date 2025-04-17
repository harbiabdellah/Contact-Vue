import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useContactStore = defineStore('contacts', () => {
  const contacts = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')

  // Getters
  const favoriteContacts = computed(() => 
    contacts.value.filter(contact => contact.isFavorite)
  )

  const filteredContacts = computed(() => {
    return contacts.value.filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      contact.phone.includes(searchQuery.value)
    )
  })

  // Actions
  const fetchContacts = async () => {
    try {
      isLoading.value = true
      const response = await axios.get('http://localhost:3000/contacts')
      contacts.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const getContactById = (id) => {
    return contacts.value.find(contact => contact.id === id)
  }

  const addContact = async (contact) => {
    try {
      const response = await axios.post('http://localhost:3000/contacts', contact)
      contacts.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const updateContact = async (id, updates) => {
    try {
      const response = await axios.put(`http://localhost:3000/contacts/${id}`, updates)
      const index = contacts.value.findIndex(c => c.id === id)
      if (index !== -1) {
        contacts.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`)
      contacts.value = contacts.value.filter(contact => contact.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const toggleFavorite = async (id) => {
    const contact = contacts.value.find(c => c.id === id)
    if (contact) {
      const updated = await updateContact(id, {
        ...contact,
        isFavorite: !contact.isFavorite
      })
      return updated
    }
  }

  return {
    contacts,
    isLoading,
    error,
    searchQuery,
    favoriteContacts,
    filteredContacts,
    fetchContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite
  }
})