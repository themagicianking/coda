import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Annotations } from './components/Annotations'
import { Playlist } from './components/Playlist'
import { Selection } from './components/Selection'
import { Welcome } from './components/Welcome'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/annotations" element={<Annotations />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </Router>
  )
}

export default App
