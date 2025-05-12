import { getItemWithExpiration, setItemWithExpiration } from './localStorage'

export async function fetchWithOAuth(serverCall, serverURL) {
  async function getValidAccessToken() {
    if (!getItemWithExpiration('ACCESS_TOKEN')) {
      const refreshToken = getItemWithExpiration('REFRESH_TOKEN')
      if (refreshToken) {
        return await refreshAccessToken(refreshToken)
      } else {
        console.error('No refresh token available.')
        return null
      }
    }
    return getItemWithExpiration('ACCESS_TOKEN')
  }

  async function refreshAccessToken(refreshToken) {
    try {
      const response = await fetch(`${serverURL}/refresh_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ REFRESH_TOKEN: refreshToken })
      })

      if (!response.ok) {
        throw new Error('Failed to refresh access token.')
      }

      const data = await response.json()
      setItemWithExpiration('ACCESS_TOKEN', data.ACCESS_TOKEN)
      return data.ACCESS_TOKEN
    } catch (error) {
      console.error('Error refreshing access token:', error)
      return null
    }
  }

  const ACCESS_TOKEN = await getValidAccessToken()
  serverCall(ACCESS_TOKEN)
}
