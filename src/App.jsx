import './styles/css/App.css'
import Dropdown from './components/Dropdown'


function App() {
  return (
  <>
    <div className="title">
    <a href="https://healthcare.utah.edu/" target="_blank" rel="noreferrer">
      <img src="https://healthcare.utah.edu/themes/custom/theme_uou_clinical/logo.svg" className="logo uhealth" alt="UHealth logo" />
    </a>
    <h1>UMB React Project</h1>
    </div>
    <div>
      <Dropdown></Dropdown>
    </div>
  </>
  )
}

export default App
