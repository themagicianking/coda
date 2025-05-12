export function setItemWithExpiration(key, value, expirationInMinutes) {
  const now = new Date()
  const item = {
    value: value,
    expiration: now.getTime() + expirationInMinutes * 60 * 1000
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function getItemWithExpiration(key) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  if (now.getTime() > item.expiration) {
    localStorage.removeItem(key)
    return null
  }

  return item.value
}