/* eslint-disable no-unused-vars */
import "./App.css"
import { useState } from "react"
// import Auth from "./components/Auth"
// import RegisterForm from "./components/RegisterForm"
// import LogInForm from "./components/LogInForm"
// import Unregistered from "./components/Unregistered"
import BioRegisterForm from "./components/biometric/BioRegisterForm"
import BioLoginForm from "./components/biometric/BioLoginForm"
import BioCheck from "./components/biometric/BioCheck"

function App() {
  const [register, setRegister] = useState(false)
  const [login, setLogin] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <>
          {(login || register) && (
            <button
              className="btn-back"
              onClick={() => {
                setRegister(false)
                setLogin(false)
              }}
            >
              Назад
            </button>
          )}

          {!login && !register && (
            <>
              <BioCheck />
              <button className="selectForm" onClick={() => setRegister(true)}>
                Регистрация
              </button>
              <button className="selectForm" onClick={() => setLogin(true)}>
                Авторизация
              </button>
            </>
          )}

          {login && <BioLoginForm userLogin={""} />}
          {register && <BioRegisterForm />}
        </>
      </header>
    </div>
  )
}

export default App
