import './App.css'
import Main from './main'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/:candidate" element={<Main />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
