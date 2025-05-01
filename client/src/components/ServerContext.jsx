import { createContext } from 'react'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const ServerContext = createContext(SERVER_URL)

export { ServerContext }
