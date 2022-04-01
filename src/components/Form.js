import { useState } from "react"
import { checkCreds } from "../api/helper"

const Form = ({ setResult }) => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const getResult = async () => {
    const res = await checkCreds({ login: login, password: password })
    setResult(res)
  }

  return (
    <div>
      <h1>Enter your credentials</h1>
      <div className="form">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log("login:", login)
            console.log("password:", password)
            getResult()
          }}
        >
          <label>Login</label>
          <input
            className="form-input"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="form-submit" type="submit" value="submit" />
        </form>
      </div>
    </div>
  )
}

export default Form
