import axios from 'axios'
import { getSession } from 'next-auth/react'

// Create admin-specific axios instance (no x-org-id header)
export const protectedAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API || 'https://inhouseshop.up.railway.app',
})

// Interceptor for admin routes - only adds Authorization, NO x-org-id
protectedAxios.interceptors.request.use(async (config: any) => {
    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
    }

    // Get session to extract token
    // const session = await getSession()
    // const token = session?.accessToken
    const token = localStorage.getItem('access_token');

    console.log('Admin Token:', token)

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
