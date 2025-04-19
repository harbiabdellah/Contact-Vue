import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useContactStore = defineStore('contacts', () => {
  const contacts = ref([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St",
      isFavorite: true,
      userId: 1
    }
  ])

  const isLoading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken }
    }
    return {}
  }

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
      const { data } = await axios.get('/api/contacts', {
        headers: getAuthHeader()
      } )
      const user = JSON.parse( localStorage.getItem( 'user' ) ).id
      contacts.value = data.filter( contact => contact.userId === user )
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
      const user = JSON.parse(localStorage.getItem('user'))
      const { data } = await axios.post('/api/contacts', {
        ...contact,
        userId: user?.id || 1
      }, {
        headers: getAuthHeader()
      })
      contacts.value.push(data)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const updateContact = async (id, updates) => {
    try {
      const response = await axios.patch(`http://localhost:3000/contacts/${id}`, updates, {
        headers: getAuthHeader()
      })
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
      await axios.delete(`http://localhost:3000/contacts/${id}`, {
        headers: getAuthHeader()
      })
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
