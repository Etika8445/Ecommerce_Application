import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './shared/components/Header'
function App() {
  
  return (
    <>
    <BrowserRouter>
      <Header/>
    </BrowserRouter>
    </>
  )
}

export default App
