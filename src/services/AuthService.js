// src/services/AuthService.js
const mockUsers = [
  { id: 1, name: "Test User", email: "test@example.com", password: "password" }
]

class AuthService {
  login(user) {
    return new Promise((resolve, reject) => {
      const foundUser = mockUsers.find(u => 
        u.email === user.email && u.password === user.password
      )
      if (foundUser) {
        const response = {
          data: {
            accessToken: 'fake-jwt-token',
            user: {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email
            }
          }
        }
        localStorage.setItem('user', JSON.stringify(response.data))
        resolve(response.data)
      } else {
        reject(new Error('Invalid credentials'))
      }
    })
  }

  // تسجيل الخروج
  logout() {
    localStorage.removeItem('user')
    return Promise.resolve()
  }

  // تسجيل مستخدم جديد
  register(user) {
    return new Promise((resolve, reject) => {
      const emailExists = mockUsers.some(u => u.email === user.email)
      
      if (emailExists) {
        reject(new Error('Email already exists'))
      } else {
        const newUser = {
          id: mockUsers.length + 1,
          ...user
        }
        mockUsers.push(newUser)
        
        const response = {
          data: {
            accessToken: 'fake-jwt-token',
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email
            }
          }
        }
        localStorage.setItem('user', JSON.stringify(response.data))
        resolve(response.data)
      }
    })
  }
}

export default new AuthService()