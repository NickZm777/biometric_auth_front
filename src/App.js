import "./App.css"
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import Form from "./components/Form"
import Unregistered from "./components/Unregistered"

function App() {
  const [data, setData] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form setResult={setData} />} />
            <Route path="auth" element={<Auth info={data?.data?.userName} />} />
            <Route
              path="noauth"
              element={<Unregistered info={data?.data?.details} />}
            />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App
