import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Annotations } from './components/Annotations'
import { Selection } from './components/Selection'
import { Welcome } from './components/Welcome'
import { ServerContext } from './components/ServerContext'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function App() {
  return (
    <ServerContext.Provider value={SERVER_URL}>
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/annotations" element={<Annotations />} />
        </Routes>
      </Router>
    </ServerContext.Provider>
  )
}

export default App
