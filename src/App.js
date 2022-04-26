/* eslint-disable no-unused-vars */
import "./App.css"
import { useState } from "react"
// import Auth from "./components/Auth"
// import RegisterForm from "./components/RegisterForm"
// import LogInForm from "./components/LogInForm"
// import Unregistered from "./components/Unregistered"
import BioRegisterForm from "./components/biometric/BioRegisterForm"
import BioLoginForm from "./components/biometric/BioLoginForm"
import BioCheck from "./components/BioCheck"

// const RES = {
//   SUCCESS: "success",
//   WARNING: "warning",
// }

function App() {
  // const [data, setData] = useState("")

  // const [bioRegister, setBioRegister] = useState(true)

  // const changeForm = () => {
  //   setRegister((req) => !req)
  // }

  const [register, setRegister] = useState(false)
  const [login, setLogin] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <>
          <button
            className="btn-back"
            onClick={() => {
              setRegister(false)
              setLogin(false)
            }}
          >
            Назад
          </button>

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

          {/* {bioRegister ? (
            <BioForm />
          ) : (
            <>
              {!data && !register && (
                <LogInForm changeForm={changeForm} setResult={setData} />
              )}
              {!data && register && (
                <RegisterForm changeForm={changeForm} setResult={setData} />
              )}
              {data?.status === RES.SUCCESS && (
                <Auth info={data?.data.userInfo} />
              )}
              {data?.status === RES.WARNING && (
                <Unregistered info={data?.data} />
              )}
            </>
          )} */}
        </>
      </header>
    </div>
  )
}

export default App
