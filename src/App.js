import "./App.css"
import { useState } from "react"
import Auth from "./components/Auth"
import RegisterForm from "./components/RegisterForm"
import LogInForm from "./components/LogInForm"
import Unregistered from "./components/Unregistered"
import Bio from "./components/Bio"

const RES = {
  SUCCESS: "success",
  WARNING: "warning",
}

function App() {
  const [data, setData] = useState("")
  const [register, setRegister] = useState(false)

  const changeForm = () => {
    setRegister((req) => !req)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Bio />
        {!data && !register && (
          <LogInForm changeForm={changeForm} setResult={setData} />
        )}
        {!data && register && (
          <RegisterForm changeForm={changeForm} setResult={setData} />
        )}
        {data?.status === RES.SUCCESS && <Auth info={data?.data.userInfo} />}
        {data?.status === RES.WARNING && <Unregistered info={data?.data} />}
      </header>
    </div>
  )
}

export default App
