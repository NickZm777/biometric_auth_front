import "./App.css"
import { useState } from "react"
import Auth from "./components/Auth"
import Form from "./components/Form"
import Unregistered from "./components/Unregistered"

function App() {
  const [data, setData] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        {!data && <Form setResult={setData} />}
        {data?.status === "success" && <Auth info={data?.data?.userName} />}
        {data?.status === "warning" && (
          <Unregistered info={data?.data?.details} />
        )}
      </header>
    </div>
  )
}

export default App
