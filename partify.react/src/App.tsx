import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeToggle from './ThemeToggle'
import Sidebar from './Sidebar'

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
          <div className="hero">
            <div className="logos">
              <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h2>Welcome to Your React App</h2>
            <p>A modern, responsive template with dark and light mode support.</p>
          </div>

          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
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
