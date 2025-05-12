import { getItemWithExpiration, setItemWithExpiration } from './localStorage'

export async function fetchWithOAuth(serverCall, serverURL) {
  async function getValidAccessToken() {
    if (!getItemWithExpiration('ACCESS_TOKEN')) {
      const refreshToken = localStorage.getItem('REFRESH_TOKEN')
      if (refreshToken) {
        return await refreshAccessToken(refreshToken)
      } else {
        console.error('No refresh token available.')
        return null
      }
    } else {
      return getItemWithExpiration('ACCESS_TOKEN')
    }
  }

  async function refreshAccessToken(refreshToken) {
    try {
      await fetch(`${serverURL}/refresh_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ REFRESH_TOKEN: refreshToken })
      })
        .then((response) => {
          if (response.status >= 400) {
            throw response.status
          }
          return response.json()
        })
        .then((json) => {
          console.log('Access token refreshed successfully.')
          setItemWithExpiration('ACCESS_TOKEN', json.access_token, 60)
        })
    } catch (error) {
      console.error('Error refreshing access token:', error)
      return null
    }
  }

  const ACCESS_TOKEN = await getValidAccessToken()
  serverCall(ACCESS_TOKEN)
}
