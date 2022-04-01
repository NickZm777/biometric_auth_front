import { useState } from "react"
import { checkCreds } from "../api/helper"
import { useNavigate } from "react-router-dom"

const Form = ({ setResult }) => {
  const navigate = useNavigate()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const redirect = (result) => {
    if (
      result?.status === "success" &&
      result?.data?.details === "authenticated_successful"
    ) {
      navigate("/auth")
    }
    if (result?.status === "warning") {
      navigate("/noauth")
    }
  }
  const getResult = async () => {
    const res = await checkCreds({ login: login, password: password })
    setResult(res)
    redirect(res)
  }

  return (
    <div>
      <h1>Enter your credentials</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log("login:", login)
            console.log("password:", password)
            getResult()
          }}
        >
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  )
}

export default Form
