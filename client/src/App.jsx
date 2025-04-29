import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Annotations } from './components/Annotations'
import { Selection } from './components/Selection'
import { Welcome } from './components/Welcome'
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/annotations" element={<Annotations />} />
      </Routes>
    </Router>
  )
}
