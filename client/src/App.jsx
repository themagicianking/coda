import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Annotations } from './components/Annotations'
import { Playlist } from './components/Playlist'
import { Selection } from './components/Selection'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/selection" element={<Selection />} />
        <Route path="/annotations" element={<Annotations />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </Router>
  )
}

export default App
