import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/CustomerStyles.css'
import ThemeToggle from './ThemeToggle'
import Sidebar from './Sidebar'
import CustomerManagement from './pages/CustomerManagement'

function App() {
  const [count, setCount] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <button
              className="sidebar-toggle"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <h1 className="title">Partify React</h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="main">
          <CustomerManagement />
        </main>

        <footer className="footer">
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
