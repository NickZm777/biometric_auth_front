import { useState } from "react"
import { addUser } from "../api/helper"

const RegisterForm = ({ changeForm, setResult }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const getResult = async () => {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      login: login,
      password: password,
    }
    const res = await addUser(newUser)
    setResult(res)
  }

  return (
    <div>
      <h1>Register new user</h1>
      <div className="form">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log("firstName:", firstName)
            console.log("lastName:", lastName)
            console.log("login:", login)
            console.log("password:", password)
            getResult()
          }}
        >
          <label>First name</label>
          <input
            className="form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last name</label>
          <input
            className="form-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
        <button className="switchBTN" onClick={changeForm}>
          Switch to LogIn
        </button>
      </div>
    </div>
  )
}

export default RegisterForm
