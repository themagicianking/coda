import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Annotations } from './components/Annotations'
import { Selection } from './components/Selection'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/selection" element={<Selection />} />
        <Route path="/annotations" element={<Annotations />} />
      </Routes>
    </Router>
  )
}

export default App
