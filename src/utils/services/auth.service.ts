import { protectedAxios, publicAxios } from '@/libs/axios'

/* =======================
   Types
======================= */

export type LoginPayload = {
  email: string
  password: string
}

export type AuthUser = {
  user_id: string
  first_name: string
  last_name: string
  email: string
  role: 'USER' | 'ADMIN'
}

export type AuthResponse = {
  success: true
  data: AuthUser
}

/* =======================
   Auth Service
======================= */

export const authService = {
  /* Login */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await publicAxios.post('/api/v1/auth/login', payload)
    return res.data
  },

  /* Logout */
  async logout(): Promise<{ success: true }> {
    const res = await protectedAxios.post('/api/v1/auth/logout')
    return res.data
  },

  /* Get current logged-in user */
  async me(): Promise<AuthResponse> {
    const res = await protectedAxios.get('/api/v1/auth/me')
    return res.data
  },
}
