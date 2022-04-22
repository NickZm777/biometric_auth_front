/* eslint-disable no-unused-vars */
import "./App.css"
import { useState } from "react"
import Auth from "./components/Auth"
import RegisterForm from "./components/RegisterForm"
import LogInForm from "./components/LogInForm"
import Unregistered from "./components/Unregistered"
import BioForm from "./components/BioForm"
import Bio from "./components/Bio"
import Bio2 from "./components/Bio2"
import Bio3 from "./components/Bio3"
import Bio4 from "./components/Bio4"

const RES = {
  SUCCESS: "success",
  WARNING: "warning",
}

function App() {
  const [data, setData] = useState("")
  const [register, setRegister] = useState(false)
  const [bioR, setBioR] = useState(true)
  const [getCredsPage, setGetCredsPage] = useState(false) // change if need test BIO_2

  const changeForm = () => {
    setRegister((req) => !req)
  }

  return (
    <div className="App">
      <header className="App-header">
        {getCredsPage ? (
          <Bio2 changeForm={() => setGetCredsPage((flag) => !flag)} />
        ) : (
          <>
            <button
              className="btn-switch"
              onClick={() => setBioR((flag) => !flag)}
            >
              switch
            </button>
            {bioR ? (
              <BioForm />
            ) : (
              <>
                <Bio />
                <Bio3 />
                <Bio4 />
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
            )}
          </>
        )}
      </header>
    </div>
  )
}

export default App
